module.exports=function(n){var t={};function e(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return n[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(o,i,function(t){return n[t]}.bind(null,i));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=2)}([function(n,t){n.exports=require("child_process")},function(n,t){n.exports=require("os")},function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=e(3),i=e(4),r=e(5),s=e(6),d=e(7),l=e(0),a=e(13),u=e(1);t.activate=function(n){let t;const e=new a.EventEmitter;let c=!1;const f=u.platform(),p={linux:{cmd:"netstat",args:["-apntu"]},darwin:{cmd:"netstat",args:["-v","-n","-p","tcp"]},win32:{cmd:"netstat.exe",args:["-a","-n","-o"]}}[f];o.commands.executeCommand("setContext","aesop-awake",!0);const g=o.window.createStatusBarItem(o.StatusBarAlignment.Left,7);g.text="Aesop is finding your Storybook dependency...",g.color="#FFFFFF",g.command=void 0,g.tooltip="Aesop status";let m=o.commands.registerCommand("extension.aesopAwaken",()=>{g.show();let a=!1;const m=i.fileURLToPath(o.workspace.workspaceFolders[0].uri.toString(!0));s.access(r.join(m,"/node_modules/@storybook"),n=>{if(n)throw o.window.showErrorMessage(`Aesop could not find Storybook as a dependency in the active folder, ${m}`),new Error("Error finding a storybook project");g.text="Aesop found a Storybook project.",d.lookup({command:"node",psargs:"ux"},(n,i)=>{if(n)throw o.window.showErrorMessage(`Failed looking for running Node processes. Error: ${n}`),g.dispose(),new Error("Failed looking for running Node processes.");g.text="Reviewing Node processes...",i.forEach(n=>{if(n.arguments[0].includes("node_modules")&&n.arguments[0].includes("storybook")){const i=n.arguments.indexOf("-p"),r=parseInt(n.pid).toString();if(-1!==i)return t=parseInt(n.arguments[i+1]),void e.emit("sb_on");{const i=l.spawn(p.cmd,p.args),s=l.spawn("grep",[r]);i.stdout.pipe(s.stdin),s.stdout.setEncoding("utf8"),s.stdout.on("data",o=>{const i=o.split(/\s/).filter(String),r="win32"===f?1:3;console.log(i),t=parseInt(i[r].replace(/[^0-9]/g,"")),e.emit("sb_on"),n.send("killNet"),n.send("killGrep")}),n.on("killGrep",()=>{console.log("Killed Grep"),s.kill()}),i.on("killNet",()=>{console.log("Killed Net"),i.kill()}),i.stdout.on("exit",n=>{o.window.showInformationMessage(`Netstat ended with ${n}`)}),s.stdout.on("exit",n=>{o.window.showInformationMessage(`Grep ended with ${n}`)})}a=!0,g.text="Retrieving running Storybook process..."}}),!1===a&&s.readFile(r.join(m,"package.json"),(n,i)=>{if(n)o.window.showErrorMessage(`Aesop is attempting to read ${m}. Is there a package.json file here?`),g.dispose();else{g.text="Checking package.json...";let n=JSON.parse(i.toString()).scripts.storybook.split(" "),o=u.platform();const r="./node_modules/.bin/start-storybook",s=n.indexOf("start-storybook");n[s]=r,n.push("--ci");const d="win32"===o?["run","storybook"]:n,a="win32"===o?"npm.cmd":"node",f=l.spawn(a,d,{cwd:m,detached:!0,env:process.env,windowsHide:!1,windowsVerbatimArguments:!0});g.text="Done looking. Aesop will now launch Storybook in the background.",f.stdout.setEncoding("utf8");let p=0;f.stdout.on("data",n=>{if(!0===c)return;let o=n.toString().split(" ");if(p+=1,p>=2)for(let n=165;n<o.length;n+=1)if(o[n].includes("localhost")){const i=o[n],r=/[^0-9]/g;return t=i.replace(r,""),c=!0,void e.emit("sb_on")}}),f.on("error",n=>{console.log(n),process.exit(1)}),f.on("exit",n=>{console.log(`child process exited with code ${n}`)})}})})}),e.on("sb_on",()=>{!function(t,e){g.hide(),o.window.showInformationMessage("Welcome to Aesop Storybook"),o.window.createWebviewPanel("aesop-sb","Aesop",o.ViewColumn.Beside,{enableCommandUris:!0,enableScripts:!0,portMapping:[{webviewPort:t,extensionHostPort:t}],localResourceRoots:[o.Uri.file(n.extensionPath)]}).webview.html=`\n\t\t\t<!DOCTYPE html>\n\t\t\t<html lang="en">\n\t\t\t\t<head>\n\t\t\t\t\t<meta charset="UTF-8">\n\t\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t\t\t\t<title>Aesop</title>\n\t\t\t\t\t<style>\n\t\t\t\t\t\thtml { width: 100%; height: 100%; min-width: 20%; min-height: 20%;}\n\t\t\t\t\t\tbody { display: flex; flex-flow: column nowrap; padding: 0; margin: 0; width: 100%' justify-content: center}\n\t\t\t\t\t</style>\n\t\t\t\t</head>\n\t\t\t\t<body>\n\t\t\t\t\t<iframe src="http://${e}:${t}" width="100%" height="600"></iframe>\n\t\t\t\t</body>\n\t\t\t</html>`}(t,"localhost")})});n.subscriptions.push(m)},t.deactivate=function(){process.exit()}},function(n,t){n.exports=require("vscode")},function(n,t){n.exports=require("url")},function(n,t){n.exports=require("path")},function(n,t){n.exports=require("fs")},function(n,t,e){n.exports=e(8)},function(n,t,e){var o=e(0),i="win32"===process.platform,r=e(9),s=/(\r\n)|(\n\r)|\n|\r/,d=e(1).EOL,l=n.exports=t=function(n,t){var e=o.spawn;if(i){var r=e("cmd"),l="",a=null;r.stdout.on("data",(function(n){l+=n.toString()})),r.stderr.on("data",(function(n){null===a?a=n.toString():a+=n.toString()})),r.on("exit",(function(){var n;(l=l.split(s)).forEach((function(t,e){t&&void 0===n&&0===t.indexOf("CommandLine")&&(n=e)})),l.splice(l.length-1,1),l.splice(0,n),t(a,l.join(d)||!1)})),r.stdin.write("wmic process get ProcessId,ParentProcessId,CommandLine \n"),r.stdin.end()}else{"string"==typeof n&&(n=n.split(/\s+/));const o=e("ps",n);l="",a=null;o.stdout.on("data",(function(n){l+=n.toString()})),o.stderr.on("data",(function(n){null===a?a=n.toString():a+=n.toString()})),o.on("exit",(function(){if(a)return t(a.toString());t(null,l||!1)}))}};t.lookup=function(n,t){var e,o=n.psargs||["lx"],i={};return n.pid&&(e=(e=Array.isArray(n.pid)?n.pid:[n.pid]).map((function(n){return String(n)}))),n.command&&(i.command=new RegExp(n.command,"i")),n.arguments&&(i.arguments=new RegExp(n.arguments,"i")),n.ppid&&(i.ppid=new RegExp(n.ppid)),l(o,(function(n,o){if(n)return t(n);var s=function(n){if(!n)return[];return t=r.parse(n),e=[],t.forEach((function(n){var t=n.PID&&n.PID[0]||n.ProcessId&&n.ProcessId[0]||void 0,o=n.CMD||n.CommandLine||n.COMMAND||void 0,i=n.PPID&&n.PPID[0]||n.ParentProcessId&&n.ParentProcessId[0]||void 0;if(t&&o){var r=o[0],s="";o.length>1&&(s=o.slice(1)),e.push({pid:t,command:r,arguments:s,ppid:i})}})),e;var t,e}(o),d=[];s.forEach((function(n){var t,o=!0;if(!(e&&e.indexOf(String(n.pid))<0)){for(t in i)o=!!i[t].test(n[t])&&o;o&&d.push(n)}})),t(null,d)}))},t.kill=function(n,e,o){2==arguments.length&&"function"==typeof e&&(o=e,e=void 0);var i=e&&e.timeout||30;"object"==typeof e&&(e=e.signal);try{process.kill(n,e)}catch(n){return o&&o(n)}var r=0,s=null,d=!1;function l(e){t.lookup({pid:n},(function(n,t){d||(n?(clearTimeout(s),e&&e(n)):t.length>0?(r=r-1||0,l(e)):5===++r?(clearTimeout(s),e&&e()):l(e))}))}o&&l(o),s=o&&setTimeout((function(){d=!0,o(new Error("Kill process timeout"))}),1e3*i)}},function(n,t,e){n.exports=e(10)},function(n,t,e){var o=e(11),i=/\s/;function r(n,t,e,o){return n>e&&n<o||t>e&&t<o||n<=e&&t>=o}function s(n){var t=n.match(/"/g);if(t&&1!=t.length){var e=[],o=null,i=!1,r=!1,s=0,d=t.length%2==0?t.length:t.length-1,l=null,a=n.split("");return a.forEach((function(n,t){" "!==n?'"'===n?!1===i&&s<=d?(i=!0,s++," "===l||null===l?(r=!0,o=""):o+=n):!0===i&&(i=!1,s++,!0===r?(r=!1,e.push(o),o=null):o+=n):!1!==i||" "!==l&&null!==l?o+=n:o=n:i?o+=n:null!==o&&(e.push(o),o=null),l=n,t==a.length-1&&null!==o&&(e.push(o),o=null)})),e}return n.split(/\s+/)}n.exports.parse=function(n){var t=n.split(/(\r\n)|(\n\r)|\n|\r/),e=[],d={},l=[];t.forEach((function(n){n&&n.trim()&&e.push(n)})),e.forEach((function(n,t){if(0==t){var e=n.split(/\s+/);e.forEach((function(t,o){if(t){var i=d[t]={},r=n.indexOf(t),s=r+t.length;i.titleBegin=0==o?0:r,o==e.length-1?i.titleEnd=n.length-1:i.titleEnd=s}}))}else l[t-1]=n.split("")}));var a=o(l,(function(n){return i.test(n)?-1:1}),!0),u=[];a.domains.sort((function(n,t){return n.bounding.x-t.bounding.x})),a.domains.forEach((function(n){if(1===n.identifier){var t=!1;u.forEach((function(e){var o=n.bounding,i=o.x,s=o.x+o.w;r(i,s,e.begin,e.end)&&(t=!0,e.domains.push(n),e.begin=e.begin>i?i:e.begin,e.end=e.end<s?s:e.end)})),t||u.push({begin:n.bounding.x,end:n.bounding.x+n.bounding.w,domains:[n]})}})),u.forEach((function(n){var t=null,e=null,o=!1,i=null,s=null,l=null;for(t in d)e=d[t],n.begin>e.titleBegin&&(l=n.begin-e.titleBegin,(!s||l<i)&&(s=t,i=l)),r(n.begin,n.end,e.titleBegin,e.titleEnd)&&(o=!0,e.titleBegin=e.titleBegin>n.begin?n.begin:e.titleBegin,e.titleEnd=e.titleEnd<n.end?n.end:e.titleEnd);if(!o&&s){var a=d[s];a.titleBegin=a.titleBegin>n.begin?n.begin:a.titleBegin,a.titleEnd=a.titleEnd<n.end?n.end:a.titleEnd}}));var c=[];return e.forEach((function(n,t){if(t>0){var e={},o=null,i=null,r=null;for(o in d)i=d[o],r=n.substring(i.titleBegin,i.titleEnd+1),e[o]=s(r.trim());c.push(e)}})),c}},function(n,t,e){n.exports=e(12)},function(n,t){n.exports=function(n,t,e){if(e=e||!1,!n)throw new Error("tdArray must be provided");if(!t)throw new Error("indicator must be provided");n=JSON.parse(JSON.stringify(n));var o={},i=0,r={};n.forEach((function(i,s){i.forEach((function(d,l){var a=t(d,l,s),u=[];if(n[s-1]&&void 0!==n[s-1][l]&&u.push(r[l+"_"+(s-1)]),void 0!==i[l-1]&&u.push(r[l-1+"_"+s]),e||(n[s-1]&&void 0!==n[s-1][l-1]&&u.push(r[l-1+"_"+(s-1)]),n[s-1]&&void 0!==n[s-1][l+1]&&u.push(r[l+1+"_"+(s-1)])),u.length){var f=!1;u.forEach((function(n){if(n.identifier==a)if(f){var t=r[l+"_"+s];n.domainId!=t.domainId&&(e=n.domainId,i=t.domainId,u=o[e],c=o[i],u.identifier==c.identifier&&(c.domainId=u.domainId,c.points.forEach((function(n){n.domainId=u.domainId,r[n.x+"_"+n.y].domainId=u.domainId})),u.points=u.points.concat(c.points),delete o[i]))}else!function(n,t,e,i){var s=o[i],d={value:n,x:t,y:e,identifier:s.identifier,domainId:i};r[t+"_"+e]={value:n,identifier:s.identifier,domainId:i},s.points.push(d)}(d,l,s,n.domainId),f=!0;var e,i,u,c})),f||c(d,l,s,a)}else c(d,l,s,a)}))}));var s={domains:[],totalDomains:0,groupByIdentifier:{},totalIdentifiers:0},d=null,l=null,a=null;for(d in o)(a=o[d]).bounding=u(a.points),l=a.identifier,s.domains.push(a),s.totalDomains++,l in s.groupByIdentifier||(s.groupByIdentifier[l]=[],s.totalIdentifiers++),s.groupByIdentifier[l].push(a);function u(n){var t=null,e=null,o=null,i=null;return n.forEach((function(n){(null===t||n.x<t)&&(t=n.x),(null===e||n.y<e)&&(e=n.y),(null===o||n.x>o)&&(o=n.x),(null===i||n.y>i)&&(i=n.y)})),{x:t,y:e,w:o-t,h:i-e}}function c(n,t,e,s){var d={identifier:s,domainId:++i,bounding:{},points:[]},l={value:n,x:t,y:e,identifier:s,domainId:d.domainId};r[t+"_"+e]={value:n,identifier:s,domainId:d.domainId},d.points.push(l),o[d.domainId]=d}return s}},function(n,t){n.exports=require("events")}]);
//# sourceMappingURL=extension.js.map