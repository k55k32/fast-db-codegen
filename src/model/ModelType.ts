import { Param } from "./Param";
export class ModelType {
    typeName: string
    params: Param[]
    realType: string
    tableName?: string
    primaryKey?: string
    typeRemark?: string
    constructor(typeName: string, params: Param[] = []) {
        this.typeName = typeName
        this.realType = this.typeName
        this.params = params
    }

    public addParam(param: Param) {
        this.params.push(param)
    }
}
