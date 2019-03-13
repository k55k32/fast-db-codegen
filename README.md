### 开发
- 运行 `npm i`
- 运行 `npm run dev` 编译 `bin/index.ts` 至 `dist\index.js`
- 运行 `npm run start || node dist\index.js` ` tablename1 tablename2 tablename3` 进行测试

### 配置
- 数据源配置
- 配置文件目录（模板文件目录） 项目根目录的 `.shscode` 文件夹
```json
{
    "datasource": {
        "host": "localhost",
        "user": "root",
        "password": "root",
        "port": "3306",
        "database": "xxx"
    }
}
```

### 模板
- 模板使用 ejs 进行渲染，第一行为 `#! xxx/xxx.xx` 渲染目标路径（第一行如果不是以 `#!` 开头，不进行渲染）， `#!`后的内容支持 ejs 语法
- 模板内model格式如下
```ts
interface Param {
    name: string // 字段名
    type: string // 字段类型
    remark?: string // 参数备注
}

interface ModelType {
    typeName: string // 类型名称
    params: Param[] // 字段数组
    realType: string // 类型名称（同typeName)
    tableName?: string // 表名
    primaryKey?: string // 主键字段名
    typeRemark?: string // 类型备注
}

```