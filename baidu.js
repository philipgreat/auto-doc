const puppeteer = require('puppeteer');
const axios = require('axios');

var  args= process.argv.slice(2);
console.log('myArgs: ', args);

//const endPointURL=args[0];
//webSocketDebuggerUrl: 'ws://localhost:9222/devtools/browser/0b0ed4d7-b815-429b-8df6-6c5975df00d9'


(async () => {
  //const browser = await puppeteer.launch();
  
  const response = await axios.get('http://localhost:9222/json/version')
  console.log("data", response.data);
  const {webSocketDebuggerUrl} = response.data 
  webSocketDebuggerUrl

  console.log("webSocketDebuggerUrl", webSocketDebuggerUrl);
  const url = webSocketDebuggerUrl 
  const browser = await puppeteer.connect({ browserWSEndpoint: url,headless: true,defaultViewport: {width: 1920, height: 1080}});	
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800})
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1200,
    height: 800 
  })

  await page.goto('https://www.baidu.com/',{ waitUntil: 'networkidle0'});
  //await page.screenshot({path: 'login-page.png'});
  await page.type('#kw', '飞鸟传说');
  //await page.type('#password', 'admin123');

  //await page.screenshot({path: 'home00.png'});
  //await page.click('button[type=submit]');
  //await page.keyboard.press('Enter')
  
  await page.click('input[type=submit');
  //await page.screenshot({path: 'home01.png'});
  //await page.waitForSelector('body', {visible: true})
  //await page.screenshot({path: 'home02.png'});
  //await page.hover('.icon-item-box:first-child');
  //await page.waitForSelector('body', {visible: true})
  //await page.screenshot({path: 'home03.png'});
  //await page.click('#container.sam_newgrid .c-container .t a:firstchild');
  //await page.waitForSelector('body', {visible: true})
  //await page.waitForTimeout(2000);
  //await page.screenshot({path: 'home04.png'});
  const ratio = 96 / 300;
  await page.pdf({path:"test_puppeteer_153.9mm_213.9mm.pdf", width:"50.9mm", height:"80.9mm", scale:ratio, printBackground:true});
  //await page.screenshot({ path: 'example.png' });
  //await page.close();
  //await browser.close();
})();

