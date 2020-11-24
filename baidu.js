const puppeteer = require('puppeteer');

(async () => {
  //const browser = await puppeteer.launch();
  
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' });	
  const page = await browser.newPage();
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1280,
    height: 720 
})

  await page.goto('https://www.baidu.com/',{ waitUntil: 'networkidle0'});
  await page.screenshot({path: '/var/www/html/upload/login-page.png'});
  await page.type('.s_ipt', 'SU000001');
  await page.type('.s_ipt', '\n');


  await page.screenshot({path: '/var/www/html/upload/home00.png'});
  await page.click('.s_btn');
  await page.waitForSelector('body', {visible: true})
  await page.screenshot({path: '/var/www/html/upload/home.png'});

  await browser.close();
})();


