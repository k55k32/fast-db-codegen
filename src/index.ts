#!/usr/bin/env node

import fs from 'fs'
import ejs from 'ejs'
import _path from 'path'
import TabelDefineExplain from './mysql-table-define-explain'
import DataSourceConfig from './model/DataSourceConfig'

interface CodeGenConfig {
    profile: {key: CodeGenConfig}
    datasource: DataSourceConfig
}

const CONFIG_DIR = resolve('.fast-codegen')

function resolve(dir: string) {
    return _path.join(process.cwd(), dir)
}

function mkdirs(dirname: string, callback: () => void){
    fs.exists(dirname, exists => {
        if(exists){
            callback()
        }else{
            mkdirs(_path.dirname(dirname), () => {
                fs.mkdir(dirname, callback)
            })
        }
    })
}
function writeFile(target: string , content: string) {
    target = resolve(target)
    
    
    const dirPath = target.substring(0, target.lastIndexOf('\\'))
    mkdirs(dirPath, () => {
        if (fs.existsSync(target)) {
            console.error(target, ' is exists')
        } else {
            fs.writeFile(target, content, (err) => {
                if (err) {
                    console.log('write error: ', target,  err)
                } else {
                    console.log(target, ' write success')
                }
            })
        }
    })
}

function getConfig() {
    return JSON.parse(fs.readFileSync(_path.join(CONFIG_DIR, 'config.json')).toString()) as CodeGenConfig
}

async function codeGenByDb(params: string[]) {
    const config = getConfig()
    params = params.map(param => {
        return param.replace(/-/g, '_')
    })
    const readTableDefinePromise = TabelDefineExplain(params, config.datasource)
    const ejsTemplateMap = {}
    fs.readdir(CONFIG_DIR, (err, files) => {
        if (err) {
            console.log('read dir path failed: ', CONFIG_DIR, err)
            return
        }
        files.forEach(file => {
            if (file.endsWith('.ejs')) {
                const absolutePath = _path.join(CONFIG_DIR, file)
                const fileMateData = fs.readFileSync(absolutePath).toString()
                let targetPath = fileMateData.substr(0, fileMateData.indexOf('\n'))
                if (targetPath.match(/#!.*\..*/g)) {
                    targetPath = targetPath.substr(2).trim()
                    console.log('find template: ', file, ' -> ', targetPath)
                    const content = fileMateData.substr(fileMateData.indexOf('\n') + 1)
                    ejsTemplateMap[targetPath] = content
                }
            }
        })
        readTableDefinePromise.then(modelTypeList => {
            modelTypeList.forEach(model => {
                Object.keys(ejsTemplateMap).forEach(targetPath => {
                    let parseTargetPath = ejs.render(targetPath, model)
                    writeFile(parseTargetPath, ejs.render(ejsTemplateMap[targetPath], model))
                })
            })
        })
    })
}

let params = process.argv.slice(2)
console.log('params', process.argv)
codeGenByDb(params)
