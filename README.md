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
class ModelType {
     /** 根据表名转换的类型名称 `fs_user` -> `FsUser` */
    typeName: string
    /**  根据表名转换类型名称连字符模式 `fs_demo_table_string` -> `fs-demo-table-string` */
    typeNameWithHyphen: string
    /** 所有表字段 */
    params: Field[]
    /** 目前和typeName一致 */
    realType: string
    /** 表名 */
    tableName?: string
    /** 主键名称 */
    primaryKey?: string
    /** 表备注 */
    typeRemark?: string
}

 class Field {
    /** 字段名驼峰 test_field -> testField */
    name: string
    /** 字段类型(经过转换的javascript类型) */
    type: string
    /** 原始数据库类型 */
    rawType: string
    /** 字段备注 */
    remark?: string
}

```

### 举个例子
- `fs_user` 表结构如下:
```sql
CREATE TABLE `fs_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(36) CHARACTER  NOT NULL COMMENT '用户名',
  `password` char(64) CHARACTER  NOT NULL COMMENT '密码',
  `password_salt` char(32) CHARACTER  NOT NULL COMMENT '密码Salt',
  `real_name` varchar(36) CHARACTER  DEFAULT NULL COMMENT '真实姓名',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(20) DEFAULT NULL COMMENT '电话',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `last_login_time` timestamp NULL DEFAULT NULL COMMENT '最后一次登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户基础表'
```

- 有个模板文件如下 `.fast-codege/demo.ejs` : 
```
#! .temp/<%=realType%>.json
{
    "typeName":  <%-JSON.stringify(typeName)%>,
    "fields": [<%-
        fields.map(JSON.stringify).join(',\n')%>
    ],
    "realType": <%-JSON.stringify(realType)%>,
    "tableName": <%-JSON.stringify(tableName)%>,
    "primaryKey": <%-JSON.stringify(primaryKey)%>,
    "typeRemark": <%-JSON.stringify(typeRemark)%>
}
```
会生成文件 `.temp/FsUser.json`
```json
{
    "typeName":  "FsUser",
    "typeNameWithHyphen":  "fs-user",
    "fields": [
        {"name":"id","rawType":"int","type":"number","remark":"ID"},
{"name":"username","rawType":"varchar","type":"string","remark":"用户名"},
{"name":"password","rawType":"char","type":"string","remark":"密码"},
{"name":"passwordSalt","rawType":"char","type":"string","remark":"密码Salt"},
{"name":"realName","rawType":"varchar","type":"string","remark":"真实姓名"},
{"name":"email","rawType":"varchar","type":"string","remark":"邮箱"},
{"name":"mobile","rawType":"varchar","type":"string","remark":"电话"},
{"name":"createTime","rawType":"timestamp","type":"number","remark":"创建时间"},
{"name":"updateTime","rawType":"timestamp","type":"number","remark":"更新时间"},
{"name":"lastLoginTime","rawType":"timestamp","type":"number","remark":"最后一次登录时间"}
    ],
    "realType": "FsUser",
    "tableName": "fs_user",
    "primaryKey": "id",
    "typeRemark": "用户基础表"
}
```

### 生成代码
在 `package.json`的`scripts`中添加配置
```js
{
    codegen: "codegen"
}
```
运行
```bash
npm run codegen yourTable yourTable2 yourTable3
```

### 开发
- 运行 `npm i`
- 运行 `npm run dev` 编译 `bin/index.ts` 至 `dist\index.js`
- 运行 `npm run start || node dist\index.js` ` tablename1 tablename2 tablename3` 进行测试
