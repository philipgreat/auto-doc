const puppeteer = require('puppeteer')
const axios = require('axios');
const screenshot = 'amazon_nyan_cat_pullover.png'
try {
  (async () => {
    const response = await axios.get('http://localhost:9222/json/version')
    console.log("data", response.data);
    const {webSocketDebuggerUrl} = response.data 
    webSocketDebuggerUrl
  
    console.log("webSocketDebuggerUrl", webSocketDebuggerUrl);
    const url = webSocketDebuggerUrl 
    const browser = await puppeteer.connect({ browserWSEndpoint: url,defaultViewport: {width: 1920, height: 1080}});	

    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.com')
    await page.type('#twotabsearchtextbox', 'nyan cat pullover')
    await page.click('input.nav-input')
    await page.waitForSelector('#resultsCol')
    await page.screenshot({ path: 'amazon_nyan_cat_pullovers_list.png' })
    await page.click('#pagnNextString')
    await page.waitForSelector('#resultsCol')
    const pullovers = await page.$$('a.a-link-normal.a-text-normal')
    await pullovers[2].click()
    await page.waitForSelector('#ppd')
    await page.screenshot({ path: screenshot })
    await browser.close()
    console.log('See screenshot: ' + screenshot)
  })()
} catch (err) {
  console.error(err)
}

