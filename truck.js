const puppeteer = require('puppeteer');

(async () => {
  //const browser = await puppeteer.launch();
  
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' });	
  //const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://192.168.50.56:3000' });	
  const page = await browser.newPage();
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1920,
    height: 1080 
})

  await page.goto('http://lab.doublechaintech.com/philipgreat/index.html',{ waitUntil: 'networkidle0'});
  //await page.screenshot({path: '/var/www/html/upload/login-page.png'});
  await page.type('#username', 'SU000001');
  await page.type('#password', 'admin123');

  //await page.screenshot({path: '/var/www/html/upload/home00.png'});
  await page.click('button[type=submit');

  //await page.screenshot({path: '/var/www/html/upload/home01.png'});
  await page.waitForSelector('body', {visible: true})
  //await page.screenshot({path: '/var/www/html/upload/home02.png'});
  await page.hover('.icon-item-box:first-child');
  await page.waitForSelector('body', {visible: true})
  //await page.screenshot({path: '/var/www/html/upload/home03.png'});
  await page.click('.icon-item-box:first-child');
  await page.waitForSelector('body', {visible: true})
  await page.waitForTimeout(2000);
  //await page.screenshot({path: '/var/www/html/upload/home04.png'});
  await browser.close();
})();


