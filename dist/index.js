#!/usr/bin/env node









// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
// Save the require from previous bundle to this closure if any
var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
var nodeRequire = typeof require === 'function' && require;
function newRequire(name, jumped) {
if (!cache[name]) {
if (!modules[name]) {
// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
if (!jumped && currentRequire) {
return currentRequire(name, true);
}
// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if (previousRequire) {
return previousRequire(name, true);
}
// Try the node require function if it exists.
if (nodeRequire && typeof name === 'string') {
return nodeRequire(name);
}
var err = new Error('Cannot find module \'' + name + '\'');
err.code = 'MODULE_NOT_FOUND';
throw err;
}
localRequire.resolve = resolve;
localRequire.cache = {};
var module = cache[name] = new newRequire.Module(name);
modules[name][0].call(module.exports, localRequire, module, module.exports, this);
}
return cache[name].exports;
function localRequire(x){
return newRequire(localRequire.resolve(x));
}
function resolve(x){
return modules[name][1][x] || x;
}
}
function Module(moduleName) {
this.id = moduleName;
this.bundle = newRequire;
this.exports = {};
}
newRequire.isParcelRequire = true;
newRequire.Module = Module;
newRequire.modules = modules;
newRequire.cache = cache;
newRequire.parent = previousRequire;
newRequire.register = function (id, exports) {
modules[id] = [function (require, module) {
module.exports = exports;
}, {}];
};
var error;
for (var i = 0; i < entry.length; i++) {
try {
newRequire(entry[i]);
} catch (e) {
// Save first error but execute all entries
if (!error) {
error = e;
}
}
}
if (entry.length) {
// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var mainExports = newRequire(entry[entry.length - 1]);
// CommonJS
if (typeof exports === "object" && typeof module !== "undefined") {
module.exports = mainExports;
// RequireJS
} else if (typeof define === "function" && define.amd) {
define(function () {
return mainExports;
});
// <script>
} else if (globalName) {
this[globalName] = mainExports;
}
}
// Override the current require with this new one
parcelRequire = newRequire;
if (error) {
// throw error from earlier, _after updating parcelRequire_
throw error;
}
return newRequire;
})({"model/ModelType.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
value: true
});
var ModelType =
/** @class */
function () {
function ModelType(typeName, fields) {
if (fields === void 0) {
fields = [];
}
this.typeName = typeName;
this.realType = this.typeName;
this.fields = fields;
}
return ModelType;
}();
exports.ModelType = ModelType;
},{}],"utils.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
value: true
});
function javaTypeToJavaScript(type) {
var javaTypeMap = {
'integer': 'number',
'array': '[]',
'varchar': 'string',
'bigint': 'number',
'longtext': 'string',
'datetime': 'number',
'int': 'number',
'tinyint': 'number',
'decimal': 'number',
'double': 'number',
'smallint': 'number',
'bit': 'number',
'timestamp': 'number',
'text': 'string',
'char': 'string',
'blob': 'number',
'float': 'number',
'time': 'number',
'date': 'number'
};
return javaTypeMap[type] || 'string';
}
exports.javaTypeToJavaScript = javaTypeToJavaScript;
},{}],"model/Field.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
value: true
});
var utils_1 = require("../utils");
var Field =
/** @class */
function () {
function Field(name, type, remark) {
this.name = name;
this.rawType = type;
this.type = utils_1.javaTypeToJavaScript(type);
this.remark = remark;
}
return Field;
}();
exports.Field = Field;
},{"../utils":"utils.ts"}],"mysql-table-define-explain.ts":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
function adopt(value) {
return value instanceof P ? value : new P(function (resolve) {
resolve(value);
});
}
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) {
try {
step(generator.next(value));
} catch (e) {
reject(e);
}
}
function rejected(value) {
try {
step(generator["throw"](value));
} catch (e) {
reject(e);
}
}
function step(result) {
result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
}
step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};
var __generator = this && this.__generator || function (thisArg, body) {
var _ = {
label: 0,
sent: function () {
if (t[0] & 1) throw t[1];
return t[1];
},
trys: [],
ops: []
},
f,
y,
t,
g;
return g = {
next: verb(0),
"throw": verb(1),
"return": verb(2)
}, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
return this;
}), g;
function verb(n) {
return function (v) {
return step([n, v]);
};
}
function step(op) {
if (f) throw new TypeError("Generator is already executing.");
while (_) try {
if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
if (y = 0, t) op = [op[0] & 2, t.value];
switch (op[0]) {
case 0:
case 1:
t = op;
break;
case 4:
_.label++;
return {
value: op[1],
done: false
};
case 5:
_.label++;
y = op[1];
op = [0];
continue;
case 7:
op = _.ops.pop();
_.trys.pop();
continue;
default:
if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
_ = 0;
continue;
}
if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
_.label = op[1];
break;
}
if (op[0] === 6 && _.label < t[1]) {
_.label = t[1];
t = op;
break;
}
if (t && _.label < t[2]) {
_.label = t[2];
_.ops.push(op);
break;
}
if (t[2]) _.ops.pop();
_.trys.pop();
continue;
}
op = body.call(thisArg, _);
} catch (e) {
op = [6, e];
y = 0;
} finally {
f = t = 0;
}
if (op[0] & 5) throw op[1];
return {
value: op[0] ? op[1] : void 0,
done: true
};
}
};
var __importDefault = this && this.__importDefault || function (mod) {
return mod && mod.__esModule ? mod : {
"default": mod
};
};
Object.defineProperty(exports, "__esModule", {
value: true
});
var ModelType_1 = require("./model/ModelType");
var Field_1 = require("./model/Field");
var mysql_1 = __importDefault(require("mysql"));
var connection;
function getTableDefine(tableName, dbConfig) {
return __awaiter(this, void 0, void 0, function () {
var p1, p2, p3, _a, tableDefine, columnDefine, primaryDefine, table;
return __generator(this, function (_b) {
switch (_b.label) {
case 0:
if (!connection) {
connection = mysql_1.default.createConnection(dbConfig);
connection.connect();
}
p1 = executeQuery("select table_name, table_comment from information_schema.tables where table_schema = ? and table_name = ? ", [dbConfig.database, tableName]);
p2 = executeQuery("SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT FROM information_schema.COLUMNS WHERE table_schema = ? AND table_name = ? ORDER BY ORDINAL_POSITION", [dbConfig.database, tableName]);
p3 = executeQuery("SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE table_schema = ? AND table_name = ? AND constraint_name = 'PRIMARY'", [dbConfig.database, tableName]);
return [4
/*yield*/
, Promise.all([p1, p2, p3])];
case 1:
_a = _b.sent(), tableDefine = _a[0], columnDefine = _a[1], primaryDefine = _a[2];
if (tableDefine.length === 0) {
throw "table " + tableName + " no found";
}
table = tableDefine[0];
return [2
/*return*/
, {
tableName: table['TABLE_NAME'],
tableRemark: table['TABLE_COMMENT'],
primaryKey: primaryDefine[0]['COLUMN_NAME'],
fields: columnDefine.map(function (data) {
return {
key: data['COLUMN_NAME'],
type: data['DATA_TYPE'],
remark: data['COLUMN_COMMENT']
};
})
}];
}
});
});
}
function executeQuery(query, data) {
return __awaiter(this, void 0, Promise, function () {
return __generator(this, function (_a) {
return [2
/*return*/
, new Promise(function (resolve) {
connection.query(query, data, function (e, result) {
resolve(result);
});
})];
});
});
}
function toCamelCase(source, split) {
if (split === void 0) {
split = '_';
}
var array = source.split(split);
var output = array.map(function (m) {
return m.substr(0, 1).toUpperCase() + m.substr(1);
}).join('');
return output;
}
function fieldNameParse(source) {
return source.replace(/\_(\w)/g, function (all, letter) {
return letter.toUpperCase();
});
}
/**
* 将表结构解析为 ModelType对象
*/
exports.default = function (params, dbConfig) {
return __awaiter(void 0, void 0, Promise, function () {
var modelTypeList, i, table, data, modelName, modelType;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
_a.trys.push([0,, 5, 6]);
modelTypeList = [];
i = 0;
_a.label = 1;
case 1:
if (!(i < params.length)) return [3
/*break*/
, 4];
table = params[i];
return [4
/*yield*/
, getTableDefine(table, dbConfig)];
case 2:
data = _a.sent();
modelName = toCamelCase(table);
modelType = new ModelType_1.ModelType(modelName, data.fields.map(function (field) {
return new Field_1.Field(fieldNameParse(field.key), field.type, field.remark);
}));
modelType.typeRemark = data.tableRemark;
modelType.tableName = table;
modelType.typeNameWithHyphen = table.replace(/_/g, '-').toLocaleLowerCase();
modelType.primaryKey = data.primaryKey;
modelTypeList.push(modelType);
_a.label = 3;
case 3:
i++;
return [3
/*break*/
, 1];
case 4:
return [2
/*return*/
, modelTypeList];
case 5:
connection.end();
return [7
/*endfinally*/
];
case 6:
return [2
/*return*/
];
}
});
});
};
},{"./model/ModelType":"model/ModelType.ts","./model/Field":"model/Field.ts"}],"index.ts":[function(require,module,exports) {
"use strict";
var __importDefault = this && this.__importDefault || function (mod) {
return mod && mod.__esModule ? mod : {
"default": mod
};
};
Object.defineProperty(exports, "__esModule", {
value: true
});
var fs_1 = __importDefault(require("fs"));
var ejs_1 = __importDefault(require("ejs"));
var path_1 = __importDefault(require("path"));
var mysql_table_define_explain_1 = __importDefault(require("./mysql-table-define-explain"));
var CONFIG_DIR = resolve('.fast-codegen');
function resolve(dir) {
return path_1.default.join(process.cwd(), dir);
}
function mkdirs(dirname, callback) {
fs_1.default.exists(dirname, function (exists) {
if (exists) {
callback();
} else {
mkdirs(path_1.default.dirname(dirname), function () {
fs_1.default.mkdir(dirname, callback);
});
}
});
}
/**
*
* @param target 目标目录
* @param content 内容
*/
function writeFile(target, content) {
var setting = {};
if (target.indexOf('?') > -1) {
var targetWithOption = target.split('?');
target = targetWithOption[0];
setting = queryToObject(targetWithOption[1]);
}
target = resolve(target);
var dirPath = target.substring(0, target.lastIndexOf('\\'));
mkdirs(dirPath, function () {
if (setting.mode) {
switch (setting.mode) {
case 'append':
appendFileToTarget(target, content);
break;
case 'overwrite':
if (fs_1.default.existsSync(target)) {
fs_1.default.unlinkSync(target);
}
writeFileToTarget(target, content);
break;
default:
var unknowSetting = setting.mode;
console.log('unkonwe setting mode', unknowSetting);
break;
}
} else {
if (fs_1.default.existsSync(target)) {
console.error(target, ' already exists');
} else {
writeFileToTarget(target, content);
}
}
});
}
function writeFileToTarget(target, content) {
fs_1.default.writeFile(target, content, function (err) {
if (err) {
console.log('write error: ', target, err);
} else {
console.log(target, ' write success');
}
});
}
function appendFileToTarget(target, content) {
if (fs_1.default.existsSync(target)) {
var fileContent = fs_1.default.readFileSync(target, 'utf-8');
if (fileContent.indexOf(content.trim()) > -1) {
console.log(target, 'append content exists, ignore');
return;
}
}
fs_1.default.appendFile(target, content, function (err) {
if (err) {
console.log('append error: ', target, err);
} else {
console.log(target, ' append success');
}
});
}
function queryToObject(query) {
var setting = {};
if (query) {
var kvArray = query.split('&');
kvArray.forEach(function (kv) {
var _a = kv.split('='),
k = _a[0],
v = _a[1];
if (k && v) {
setting[k] = v;
}
});
}
return setting;
}
function getConfig() {
return JSON.parse(fs_1.default.readFileSync(path_1.default.join(CONFIG_DIR, 'config.json')).toString());
}
function codeGenByDb(params) {
var config = getConfig();
params = params.map(function (param) {
return param.replace(/-/g, '_');
});
var readTableDefinePromise = mysql_table_define_explain_1.default(params, config.datasource);
var ejsTemplateMap = {};
var files = fs_1.default.readdirSync(CONFIG_DIR);
files.forEach(function (file) {
if (file.endsWith('.ejs')) {
var absolutePath = path_1.default.join(CONFIG_DIR, file);
var fileMateData = fs_1.default.readFileSync(absolutePath).toString();
var targetPath = fileMateData.substr(0, fileMateData.indexOf('\n'));
if (targetPath.match(/#!.*\..*/g)) {
targetPath = targetPath.substr(2).trim();
console.log('find template: ', file, ' -> ', targetPath);
var content = fileMateData.substr(fileMateData.indexOf('\n') + 1);
ejsTemplateMap[targetPath] = {
path: absolutePath,
content: content
};
}
}
});
readTableDefinePromise.then(function (modelTypeList) {
modelTypeList.forEach(function (model) {
Object.keys(ejsTemplateMap).forEach(function (targetPath) {
var parseTargetPath = ejs_1.default.render(targetPath, model);
var templateMap = ejsTemplateMap[targetPath];
writeFile(parseTargetPath, ejs_1.default.render(templateMap.content, model, {
filename: templateMap.path
}));
});
});
}).catch(function (error) {
console.log('render error ', error);
});
}
var params = process.argv.slice(2);
codeGenByDb(params);
},{"./mysql-table-define-explain":"mysql-table-define-explain.ts"}]},{},["index.ts"], null)
//# sourceMappingURL=/index.js.map