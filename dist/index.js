#!/usr/bin/env node




parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aWsH":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t,e){void 0===e&&(e=[]),this.typeName=t,this.realType=this.typeName,this.params=e}return t.prototype.addParam=function(t){this.params.push(t)},t}();exports.ModelType=t;
},{}],"UnXq":[function(require,module,exports) {
"use strict";function e(e){return{integer:"number",array:"[]",varchar:"string",bigint:"number",longtext:"string",datetime:"number",int:"number",tinyint:"number",decimal:"number",double:"number",smallint:"number",bit:"number",timestamp:"number",text:"string",char:"string",blob:"number",float:"number",time:"number",date:"number"}[e]||"string"}exports.__esModule=!0,exports.javaTypeToJavaScript=e;
},{}],"fe6P":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("../utils"),e=function(){return function(e,i,s,r){this.isRef=!1,this.name=e,this.type=t.javaTypeToJavaScript(i),this.isRef=s,this.remark=r}}();exports.Param=e;
},{"../utils":"UnXq"}],"yEHw":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,o){function i(e){try{s(r.next(e))}catch(t){o(t)}}function u(e){try{s(r.throw(e))}catch(t){o(t)}}function s(e){e.done?a(e.value):new n(function(t){t(e.value)}).then(i,u)}s((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(u){o=[6,u],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},r=this;exports.__esModule=!0;var a,o=require("./model/ModelType"),i=require("./model/Param"),u=n(require("mysql"));function s(n,r){return e(this,void 0,void 0,function(){var e,o,i,s,c,f,m,h;return t(this,function(t){switch(t.label){case 0:return a||(a=u.default.createConnection(r)).connect(),e=l("select table_name, table_comment from information_schema.tables where table_schema = ? and table_name = ? ",[r.database,n]),o=l("SELECT COLUMN_NAME, DATA_TYPE, COLUMN_COMMENT FROM information_schema.COLUMNS WHERE table_schema = ? AND table_name = ? ORDER BY ORDINAL_POSITION",[r.database,n]),i=l("SELECT COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE table_schema = ? AND table_name = ? AND constraint_name = 'PRIMARY'",[r.database,n]),[4,Promise.all([e,o,i])];case 1:if(s=t.sent(),c=s[0],f=s[1],m=s[2],0===c.length)throw"table "+n+" no found";return[2,{tableName:(h=c[0]).TABLE_NAME,tableRemark:h.TABLE_COMMENT,primaryKey:m[0].COLUMN_NAME,fields:f.map(function(e){return{key:e.COLUMN_NAME,type:e.DATA_TYPE,remark:e.COLUMN_COMMENT}})}]}})})}function l(n,r){return e(this,void 0,Promise,function(){return t(this,function(e){return[2,new Promise(function(e){a.query(n,r,function(t,n){e(n)})})]})})}function c(e,t){return void 0===t&&(t="_"),e.split(t).map(function(e){return e.substr(0,1).toUpperCase()+e.substr(1)}).join("")}function f(e){return e.replace(/\_(\w)/g,function(e,t){return t.toUpperCase()})}exports.default=function(n,u){return e(r,void 0,Promise,function(){var e,r,l,m,h,p;return t(this,function(t){switch(t.label){case 0:t.trys.push([0,,5,6]),e=[],r=0,t.label=1;case 1:return r<n.length?[4,s(l=n[r],u)]:[3,4];case 2:m=t.sent(),h=c(l),(p=new o.ModelType(h,m.fields.map(function(e){return new i.Param(f(e.key),e.type,!1,e.remark)}))).typeRemark=m.tableRemark,p.tableName=l,p.primaryKey=m.primaryKey,e.push(p),t.label=3;case 3:return r++,[3,1];case 4:return[2,e];case 5:return a.end(),[7];case 6:return[2]}})})};
},{"./model/ModelType":"aWsH","./model/Param":"fe6P"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var t=e(require("fs")),n=e(require("ejs")),r=e(require("path")),i=e(require("./mysql-table-define-explain")),o=u(".fast-codegen");function u(e){return r.default.join(process.cwd(),e)}function a(e,n){t.default.exists(e,function(i){i?n():a(r.default.dirname(e),function(){t.default.mkdir(e,n)})})}function f(e,n){a((e=u(e)).substring(0,e.lastIndexOf("\\")),function(){t.default.existsSync(e)?console.error(e," is exists"):t.default.writeFile(e,n,function(t){t?console.log("write error: ",e,t):console.log(e," write success")})})}function s(){return JSON.parse(t.default.readFileSync(r.default.join(o,"config.json")).toString())}function c(e){var u=s();e=e.map(function(e){return e.replace(/-/g,"_")});var a=i.default(e,u.datasource),c={};t.default.readdir(o,function(e,i){e?console.log("read dir path failed: ",o,e):(i.forEach(function(e){if(e.endsWith(".ejs")){var n=r.default.join(o,e),i=t.default.readFileSync(n).toString(),u=i.substr(0,i.indexOf("\n"));if(u.match(/#!.*\..*/g)){u=u.substr(2).trim(),console.log("find template: ",e," -> ",u);var a=i.substr(i.indexOf("\n")+1);c[u]=a}}}),a.then(function(e){e.forEach(function(e){Object.keys(c).forEach(function(t){f(n.default.render(t,e),n.default.render(c[t],e))})})}))})}var l=process.argv.slice(2);c(l);
},{"./mysql-table-define-explain":"yEHw"}]},{},["QCba"], null)
//# sourceMappingURL=/index.js.map