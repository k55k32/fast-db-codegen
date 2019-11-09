## Fast Db Codegen
以Mysql数据库作为数据源，根据读取到的表结构和提前写好的模板，生成对应的代码，使用ejs作为模板引擎

### 使用
```bash
# npm
npm install -D fast-db-codegen
# yarn
yarn add -D fast-db-codegen

codegen tableName
```

### 配置说明
- 配置文件目录（模板文件目录） 项目根目录的 `.fast-codegen` 文件夹
- `config.json` 数据源配置
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

### 模板说明
- 所有 `.fast-codegen` 文件夹下，以`.ejs`为扩展名，并且内容的第一行以`#!`开头的文件，都会当做模板处理进行软性
- 第一行 `#! xxx/xxx.xx` 为渲染目标路径（第一行如果不是以 `#!` 开头，不进行渲染）， `#!`后的内容同样支持 ejs 语法
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

### 开发
- 运行 `npm i`
- 运行 `npm run dev` 编译 `bin/index.ts` 至 `dist\index.js`
- 运行 `npm run start || node dist\index.js` ` tablename1 tablename2 tablename3` 进行测试
