import { Field } from "./Field";
export class ModelType {
    /** 根据表名转换的类型名称 `fs_user` -> `FsUser` */
    typeName: string
    /**  根据表名转换类型名称连字符模式 `fs_demo_table_string` -> `fs-demo-table-string` */
    typeNameWithHyphen: string
    /** 所有表字段 */
    fields: Field[]
    /** 目前和typeName一致 */
    realType: string
    /** 表名 */
    tableName?: string
    /** 主键名称 */
    primaryKey?: string
    /** 表备注 */
    typeRemark?: string
    constructor(typeName: string, fields: Field[] = []) {
        this.typeName = typeName
        this.realType = this.typeName
        this.fields = fields
    }
}
