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

  await page.goto('https://demo.doublechaintech.com/admin/freshchain/',{ waitUntil: 'networkidle0'});
  await page.screenshot({path: '/var/www/html/upload/login-page.png'});
  await page.type('#username', 'SU000001');
  await page.type('#password', 'admin123');

  await page.click('button[type=submit');

  await page.waitForNavigation({waitUntil: 'networkidle0'});
  await page.screenshot({path: '/var/www/html/upload/home.png'});

  await browser.close();
})();


