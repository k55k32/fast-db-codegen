#!/usr/bin/env node




parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aWsH":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=function(){return function(e,t){void 0===t&&(t=[]),this.typeName=e,this.realType=this.typeName,this.fields=t}}();exports.ModelType=e;
},{}],"UnXq":[function(require,module,exports) {
"use strict";function e(e){return{integer:"number",array:"[]",varchar:"string",bigint:"number",longtext:"string",datetime:"number",int:"number",tinyint:"number",decimal:"number",double:"number",smallint:"number",bit:"number",timestamp:"number",text:"string",char:"string",blob:"number",float:"number",time:"number",date:"number"}[e]||"string"}exports.__esModule=!0,exports.javaTypeToJavaScript=e;
},{}],"dGc5":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("../utils"),t=function(){return function(t,r,i){this.name=t,this.rawType=r,this.type=e.javaTypeToJavaScript(r),this.remark=i}}();exports.Field=t;
},{"../utils":"UnXq"}],"yEHw":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,o){function i(e){try{l(r.next(e))}catch(t){o(t)}}function u(e){try{l(r.throw(e))}catch(t){o(t)}}function l(e){e.done?a(e.value):new n(function(t){t(e.value)}).then(i,u)}l((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(u){o=[6,u],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},r=this;exports.__esModule=!0;var a,o=require("./model/ModelType"),i=require("./model/Field"),u=n(require("mysql"));function l(n,r){return e(this,void 0,void 0,function(){var e,o,i,l,c,f,h,m;return t(this,function(t){switch(t.label){case 0:return a||(a=u.default.createConnection(r)).connect(),e=s("select table_name, table_comment from information_schema.tables where table_schema = ? and table_name = ? ",[r.database,n]),o=s("SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT FROM information_schema.COLUMNS WHERE table_schema = ? AND table_name = ? ORDER BY ORDINAL_POSITION",[r.database,n]),i=s("SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE table_schema = ? AND table_name = ? AND constraint_name = 'PRIMARY'",[r.database,n]),[4,Promise.all([e,o,i])];case 1:if(l=t.sent(),c=l[0],f=l[1],h=l[2],0===c.length)throw"table "+n+" no found";return[2,{tableName:(m=c[0]).TABLE_NAME,tableRemark:m.TABLE_COMMENT,primaryKey:h[0].COLUMN_NAME,fields:f.map(function(e){return{key:e.COLUMN_NAME,type:e.DATA_TYPE,remark:e.COLUMN_COMMENT}})}]}})})}function s(n,r){return e(this,void 0,Promise,function(){return t(this,function(e){return[2,new Promise(function(e){a.query(n,r,function(t,n){e(n)})})]})})}function c(e,t){return void 0===t&&(t="_"),e.split(t).map(function(e){return e.substr(0,1).toUpperCase()+e.substr(1)}).join("")}function f(e){return e.replace(/\_(\w)/g,function(e,t){return t.toUpperCase()})}exports.default=function(n,u){return e(r,void 0,Promise,function(){var e,r,s,h,m,p;return t(this,function(t){switch(t.label){case 0:t.trys.push([0,,5,6]),e=[],r=0,t.label=1;case 1:return r<n.length?[4,l(s=n[r],u)]:[3,4];case 2:h=t.sent(),m=c(s),(p=new o.ModelType(m,h.fields.map(function(e){return new i.Field(f(e.key),e.type,e.remark)}))).typeRemark=h.tableRemark,p.tableName=s,p.typeNameWithHyphen=s.replace("_","-").toLocaleLowerCase(),p.primaryKey=h.primaryKey,e.push(p),t.label=3;case 3:return r++,[3,1];case 4:return[2,e];case 5:return a.end(),[7];case 6:return[2]}})})};
},{"./model/ModelType":"aWsH","./model/Field":"dGc5"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var n=e(require("fs")),r=e(require("ejs")),o=e(require("path")),u=e(require("./mysql-table-define-explain")),i=c(".fast-codegen");function c(e){return o.default.join(process.cwd(),e)}function f(e,r){n.default.exists(e,function(u){u?r():f(o.default.dirname(e),function(){n.default.mkdir(e,r)})})}function s(e,r){var o={};if(e.indexOf("?")>-1){var u=e.split("?");e=u[0],o=d(u[1])}f((e=c(e)).substring(0,e.lastIndexOf("\\")),function(){if(o.mode)switch(o.mode){case"append":l(e,r);break;case"overwrite":n.default.existsSync(e)&&n.default.unlinkSync(e),a(e,r);break;default:var u=o.mode;console.log("unkonwe setting mode",u)}else n.default.existsSync(e)?console.error(e," already exists"):a(e,r)})}function a(e,r){n.default.writeFile(e,r,function(n){n?console.log("write error: ",e,n):console.log(e," write success")})}function l(e,r){n.default.appendFile(e,r,function(n){n?console.log("append error: ",e,n):console.log(e," append success")})}function d(e){var n={};e&&e.split("&").forEach(function(e){var r=e.split("="),o=r[0],u=r[1];o&&u&&(n[o]=u)});return n}function t(){return JSON.parse(n.default.readFileSync(o.default.join(i,"config.json")).toString())}function p(e){var c=t();e=e.map(function(e){return e.replace(/-/g,"_")});var f=u.default(e,c.datasource),a={};n.default.readdirSync(i).forEach(function(e){if(e.endsWith(".ejs")){var r=o.default.join(i,e),u=n.default.readFileSync(r).toString(),c=u.substr(0,u.indexOf("\n"));if(c.match(/#!.*\..*/g)){c=c.substr(2).trim(),console.log("find template: ",e," -> ",c);var f=u.substr(u.indexOf("\n")+1);a[c]=f}}}),f.then(function(e){e.forEach(function(e){Object.keys(a).forEach(function(n){s(r.default.render(n,e),r.default.render(a[n],e))})})}).catch(function(e){console.log("render error ",e)})}var v=process.argv.slice(2);p(v);
},{"./mysql-table-define-explain":"yEHw"}]},{},["QCba"], null)
//# sourceMappingURL=/index.js.map