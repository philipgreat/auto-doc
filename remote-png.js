const puppeteer = require('puppeteer');
const axios = require('axios');
(async () => {
  const response = await axios.get('http://localhost:9222/json/version')
  console.log("data", response.data);
  const {webSocketDebuggerUrl} = response.data 

  console.log("webSocketDebuggerUrl", webSocketDebuggerUrl);
  const url = webSocketDebuggerUrl 
  const browser = await puppeteer.connect({ browserWSEndpoint: url });	

  console.log("browser", browser)	
  const page = await browser.newPage();
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 600,
    height: 400 
  })

  await page.goto('https://www.baidu.com',{ waitUntil: 'networkidle0'});
  //await page.screenshot({path: 'baidu.png'});
  
  await browser.close();
})();


