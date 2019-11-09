## Fast Db Codegen
以Mysql数据库作为数据源，根据读取到的表结构和提前写好的模板，生成对应的代码，使用ejs作为模板引擎

### 使用
#### 安装
```bash
# npm
npm install -D fast-db-codegen
# yarn
yarn add -D fast-db-codegen
```
#### 配置
在 `package.json`的`scripts`中添加配置
```js
{
    codegen: "codegen"
}
```

#### 数据源配置
- 在项目根目录新建 `.fast-codegen` 文件夹
- 创建 `config.json` 数据源配置
```json
{
    "datasource": {
        "host": "yourMysqlHost",
        "user": "yourMysqlUser",
        "password": "yourMysqlPassword",
        "port": "yourMysqlPort",
        "database": "yourMysqlDatabase"
    }
}
```

### 模板内参数
- 所有 `.fast-codegen` 文件夹下，以`.ejs`为扩展名，并且内容的第一行以`#!`开头的文件，都会当做模板处理进行编译
- 第一行 `#! xxx/xxx.xx` 为渲染目标路径（第一行如果不是以 `#!` 开头，不进行渲染）， `#!`后的内容同样支持 ejs 语法
- 模板内model格式如下
```ts
/**
 * 全局参数类型
 */
interface ModelType {
    typeName: string // 类型名称
    params: Param[] // 字段数组
    realType: string // 类型名称（同typeName)
    tableName?: string // 表名
    primaryKey?: string // 主键字段名
    typeRemark?: string // 类型备注
}

interface Param {
    name: string // 字段名
    type: string // 字段类型
    remark?: string // 参数备注
}

```

### 生成代码
```bash
npm run codegen yourTable yourTable2 yourTable3
```

### 开发
- 运行 `npm i`
- 运行 `npm run dev` 编译 `bin/index.ts` 至 `dist\index.js`
- 运行 `npm run start || node dist\index.js` ` tablename1 tablename2 tablename3` 进行测试
