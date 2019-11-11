import { javaTypeToJavaScript } from '../utils';

export class Field {
    /** 字段名驼峰 test_field -> testField */
    name: string
    /** 字段类型(经过转换的javascript类型) */
    type: string
    /** 原始数据库类型 */
    rawType: string
    /** 字段备注 */
    remark?: string
    constructor(name: string, type: string, remark?: string) {
        this.name = name
        this.rawType = type
        this.type = javaTypeToJavaScript(type)
        this.remark = remark
    }

}
