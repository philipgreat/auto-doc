const puppeteer = require('puppeteer');


var  args= process.argv.slice(2);
console.log('myArgs: ', args);

const endPointURL=args[0];



(async () => {
  //const browser = await puppeteer.launch();
  const url = endPointURL 
  const browser = await puppeteer.connect({ browserWSEndpoint: url });	
  const page = await browser.newPage();
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1920,
    height: 1080 
})

  await page.goto('https://demo.doublechaintech.com/admin/freshchain/',{ waitUntil: 'networkidle0'});
  await page.screenshot({path: 'login-page.png'});
  await page.type('#username', 'SU000001');
  await page.type('#password', 'admin123');

  await page.screenshot({path: 'home00.png'});
  await page.click('button[type=submit');

  await page.screenshot({path: 'home01.png'});
  await page.waitForSelector('body', {visible: true})
  await page.screenshot({path: 'home02.png'});
  await page.hover('.icon-item-box:first-child');
  await page.waitForSelector('body', {visible: true})
  await page.screenshot({path: 'home03.png'});
  await page.click('.icon-item-box:first-child');
  await page.waitForSelector('body', {visible: true})
  await page.waitForTimeout(2000);
  await page.screenshot({path: 'home04.png'});
})();

