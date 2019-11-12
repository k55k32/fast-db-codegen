#!/usr/bin/env node

import fs from 'fs'
import ejs from 'ejs'
import _path from 'path'
import TabelDefineExplain from './mysql-table-define-explain'
import DataSourceConfig from './model/DataSourceConfig'
import Setting from './model/Setting'

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
/**
 * 
 * @param target 目标目录
 * @param content 内容
 */
function writeFile(target: string , content: string) {
    let setting = {} as Setting
    if (target.indexOf('?') > -1) {
        const targetWithOption = target.split('?')
        target = targetWithOption[0]
        setting = queryToObject(targetWithOption[1]) 
    }
    target = resolve(target)
    
    
    const dirPath = target.substring(0, target.lastIndexOf('\\'))
    mkdirs(dirPath, () => {
        if (setting.mode) {
            switch(setting.mode) {
                case 'append': 
                    appendFileToTarget(target, content)
                    break
                case 'overwrite':
                    if (fs.existsSync(target)) {
                        fs.unlinkSync(target)
                    }
                    writeFileToTarget(target, content)
                    break
                default:
                    const unknowSetting = setting.mode as never
                    console.log('unkonwe setting mode', unknowSetting)
                    break
            }
        } else {
            if (fs.existsSync(target)) {
                console.error(target, ' already exists')
            } else {
                writeFileToTarget(target, content)
            }
        }
    })
}

function writeFileToTarget(target: string, content: string) {
    fs.writeFile(target, content, (err) => {
        if (err) {
            console.log('write error: ', target,  err)
        } else {
            console.log(target, ' write success')
        }            
    })
}
function appendFileToTarget(target: string, content: string) {
    if (fs.existsSync(target)) {
        const fileContent = fs.readFileSync(target, 'utf-8')
        if (fileContent.indexOf(content.trim()) > -1) {
            console.log(target, 'append content exists, ignore')
            return
        }
    }
    fs.appendFile(target, content, (err) => {
        if (err) {
            console.log('append error: ', target,  err)
        } else {
            console.log(target, ' append success')
        }
    }) 
}

function queryToObject(query: string) {
    const setting = {}
    if (query) {
        const kvArray = query.split('&')
        kvArray.forEach(kv => {
            const [k, v] = kv.split('=')
            if(k && v) {
                setting[k] = v
            }
        })
    }
    return setting as Setting
}

function getConfig() {
    return JSON.parse(fs.readFileSync(_path.join(CONFIG_DIR, 'config.json')).toString()) as CodeGenConfig
}

function codeGenByDb(params: string[]) {
    const config = getConfig()
    params = params.map(param => {
        return param.replace(/-/g, '_')
    })
    const readTableDefinePromise = TabelDefineExplain(params, config.datasource)
    const ejsTemplateMap = {}
    const files = fs.readdirSync(CONFIG_DIR)
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
    }).catch((error) => {
        console.log('render error ', error)
    })
}

let params = process.argv.slice(2)
codeGenByDb(params)
