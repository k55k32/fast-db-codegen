import { javaTypeToJavaScript } from '../utils';

export class Param {
    name: string
    type: string
    remark?: string
    isRef = false
    constructor(name: string, type: string, isRef?: boolean, remark?: string) {
        this.name = name
        this.type = javaTypeToJavaScript(type)
        this.isRef = isRef
        this.remark = remark
    }

}
