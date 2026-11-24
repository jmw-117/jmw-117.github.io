const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const {spawn} = require('node:child_process');
const assert = require('node:assert/strict');
const pause = ms => new Promise(resolve=>setTimeout(resolve,ms));
(async () => {
 const dist=path.resolve('dist');
 const server=http.createServer((req,res)=>{
   const name=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';
   const file=path.join(dist,name);
   if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
   if(name.endsWith('html'))res.setHeader('Content-Type','text/html; charset=utf-8');
   fs.createReadStream(file).pipe(res);
 });
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'portfolio-chrome-'));
 const browser=spawn(process.env.CHROME_BIN || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : 'google-chrome'),['--headless',...(process.platform==='linux'?['--no-sandbox']:[]),'--disable-gpu','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
 let ws;
 try {
  let tab;
  for(let i=0;i<160&&!tab;i++){try{const port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];tab=(await(await fetch('http://127.0.0.1:'+port+'/json/list',{signal:AbortSignal.timeout(1500)})).json()).find(x=>x.type==='page');}catch{}if(!tab)await pause(250);}
  assert.ok(tab,'Chrome did not start');
  ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(ok=>ws.onopen=ok);
  let seq=0;const calls=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(calls.has(m.id)){calls.get(m.id)(m);calls.delete(m.id)}};
  const call=async(method,params={})=>{const id=++seq;const result=new Promise(ok=>calls.set(id,ok));ws.send(JSON.stringify({method,params,id}));const msg=await result;if(msg.error)throw Error(JSON.stringify(msg.error));return msg.result};
  const js=async(expression)=>(await call('Runtime.evaluate',{expression,returnByValue:true})).result.value;
  await call('Page.navigate',{url:'http://127.0.0.1:'+server.address().port+'/'});
  for(let i=0;i<120&&!await js('!!document.querySelector("#compass-title")');i++)await pause(120);
  assert.equal(await js('document.querySelector("#compass-title").textContent'),'Silverspark Compass');
  for(const width of [320,375,768,1280]){
   await call('Emulation.setDeviceMetricsOverride',{width,height:850,deviceScaleFactor:1,mobile:false});
   assert.equal(await js('document.documentElement.scrollWidth <= innerWidth'),true,'Overflow at '+width);
   assert.equal(await js('[...document.querySelectorAll(".project-links a")].every(a=>a.getBoundingClientRect().height>=44)'),true);
  }
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  assert.equal(await js('getComputedStyle(document.documentElement).scrollBehavior'),'auto');
  let found=false;
  for(let i=0;i<30;i++){
   await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',windowsVirtualKeyCode:9});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',windowsVirtualKeyCode:9});
   if(await js('document.activeElement?.getAttribute("href")==="/compass-web/"')){found=true;break;}
  }
  assert.ok(found,'Compass link is unreachable by keyboard');
  assert.equal(await js('document.activeElement.matches(":focus-visible")'),true);
  assert.equal(await js('document.querySelector(".project-links a:last-child").href'),'https://github.com/jmw-117/compass-web');
  const cv=await js('document.querySelector("a[download]").href');assert.equal((await fetch(cv)).status,200);
  console.log('Portfolio passed at 320, 375, 768 and 1280px. Keyboard, reduced motion, project links and CV download passed.');
 }finally{ws?.close();browser.kill();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

