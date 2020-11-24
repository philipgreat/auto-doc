const puppeteer = require('puppeteer');

(async () => {
  //const browser = await puppeteer.launch();
  
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' });	
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(1000000);
  await page.goto('http://t420.doublechaintech.cn:2080/sky/docengine/data-design.jsp?name=storedev',{waitUntil: 'networkidle0'});
  //await page.screenshot({path: '/var/www/html/upload/login-page.png'});
  const pdf = await page.pdf({ path:'/var/www/html/upload/store-dev-design.pdf',format: 'A3',printBackground: true });

  await browser.close();
})();


