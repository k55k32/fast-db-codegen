import { ModelType } from "./model/ModelType"
import { Field } from './model/Field'
import DataSourceConfig from "./model/DataSourceConfig"
import mysql, { RowDataPacket } from 'mysql'
import Connection = require("mysql/lib/Connection")

interface TableInfoEntity {
    tableName: string
    tableRemark: string
    primaryKey: string
    fields: {key: string, type: string, remark: string}[]
}
let connection: Connection
async function getTableDefine(tableName: string, dbConfig: DataSourceConfig) {
    if (!connection) {
        connection = mysql.createConnection(dbConfig)
        connection.connect()
    }
    const p1 = executeQuery(`select table_name, table_comment from information_schema.tables where table_schema = ? and table_name = ? `, [dbConfig.database, tableName])
    const p2 = executeQuery(`SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT FROM information_schema.COLUMNS WHERE table_schema = ? AND table_name = ? ORDER BY ORDINAL_POSITION`, [dbConfig.database, tableName])
    const p3 = executeQuery(`SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE table_schema = ? AND table_name = ? AND constraint_name = 'PRIMARY'`, [dbConfig.database, tableName])
    const [tableDefine, columnDefine, primaryDefine] = await Promise.all([p1, p2, p3])
    if (tableDefine.length === 0) {
        throw `table ${tableName} no found`
    }
    const table = tableDefine[0]
    
    return {
        tableName: table['TABLE_NAME'],
        tableRemark: table['TABLE_COMMENT'],
        primaryKey: primaryDefine[0]['COLUMN_NAME'],
        fields: columnDefine.map(data => {
            return {
                key: data['COLUMN_NAME'],
                type: data['DATA_TYPE'],
                remark: data['COLUMN_COMMENT']
            }
        })
    } as TableInfoEntity
}

async function executeQuery(query: string, data: any[]): Promise<RowDataPacket[]> {
    return new Promise((resolve) => {
        connection.query<RowDataPacket[]>(query, data, (e, result) => {
            resolve(result)
        })
    }) 
}

function toCamelCase(source: string, split = '_') {
    let array = source.split(split)
    let output = array.map(m => m.substr(0, 1).toUpperCase() + m.substr(1)).join('')
    return output
}

function fieldNameParse(source: string) {
    return source.replace(/\_(\w)/g, (all, letter) => {
        return letter.toUpperCase()
    })
}

/**
 * 将表结构解析为 ModelType对象
 */
export default async (params: string[], dbConfig: DataSourceConfig): Promise<ModelType[]> => {
    try {
        const modelTypeList = []
        for(let i = 0; i < params.length; i++) {
            const table = params[i]
            const data = await getTableDefine(table, dbConfig)
            const modelName = toCamelCase(table)
            const modelType = new ModelType(modelName, data.fields.map(field => {
                return new Field(fieldNameParse(field.key), field.type, field.remark)
            }))
            modelType.typeRemark = data.tableRemark
            modelType.tableName = table
            modelType.typeNameWithHyphen = table.replace(/_/g, '-').toLocaleLowerCase()
            modelType.primaryKey = data.primaryKey
            modelTypeList.push(modelType)
        }
        return modelTypeList
    } finally {
        connection.end()
    }
}