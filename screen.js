const puppeteer = require('puppeteer');

(async () => {
  //const browser = await puppeteer.launch();
  
  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' });	
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(1000000);
  await page.setViewport({
    width: 1280,
    height: 720 
})
  await page.goto('https://demo.doublechaintech.com/admin/freshchain/',{ waitUntil: 'networkidle0'});
  await page.screenshot({path: '/var/www/html/upload/login-page.png'});
  //await page.$eval('form-selector', form => form.submit());
  //const usernameInput=await page.$('#username'); usernameInput.value='SU000001';
  //const passwordInput=await page.$('#password'); passwordInput.value='admin123';
  await page.waitForTimeout(20000);
  await page.evaluate((a, b) => {
      document.querySelector('#username').value = a;
      document.querySelector('#password').value = b;
      //document.querySelector('button[type=submit]').click();
    }, 'SU000001', 'admin123');
  await page.screenshot({path: '/var/www/html/upload/home00.png'});
  /*
  await page.evaluate(() => {
      document.querySelector('button[type=submit]').click();
    });
*/
  await page.focus('button[type="submit"]')
  //await page.keyboard.type('\n');
  await page.$eval('button[type=submit]', elem => elem.click());

  await page.screenshot({path: '/var/www/html/upload/home.png'});

  await browser.close();
})();


