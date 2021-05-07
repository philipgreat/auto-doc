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

  console.log("webSocketDebuggerUrl", webSocketDebuggerUrl);
  const url = webSocketDebuggerUrl 
  const browser = await puppeteer.connect({ browserWSEndpoint: url });	
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800})
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1200,
    height: 800 
  })

async function clickShot(selector,path){
  await page.waitForSelector(selector, {visible: true})
  await page.click(selector);
  await page.waitForTimeout(2000);
  await page.screenshot({path: path});
}


async function mulitClickShot(parentselector,selector,path){
  await page.waitForSelector(parentselector, {visible: true})
  await page.click(parentselector);
  await page.waitForSelector(selector, {visible: true})
  await page.click(selector);
  await page.waitForTimeout(3000);
  await page.screenshot({path: path});
  await page.click(parentselector);
  await page.waitForTimeout(3000);
}

async function hoverShot(selector,path){
  await page.waitForSelector(selector, {visible: true})
  await page.hover(selector);
  await page.waitForTimeout(1000);
  await page.screenshot({path: path});
}

  await page.goto('http://lab.doublechaintech.com/philipgreat/index.html',{ waitUntil: 'networkidle0'});
  await page.screenshot({path: 'login-page.png'});
  await page.type('#username', 'SU000001');
  await page.type('#password', 'admin123');
  await page.screenshot({path: 'home00.png'});

  clickShot('button[type=submit','login.png');

 await page.waitForTimeout(5000); 
  // platform
  await page.goto('http://lab.doublechaintech.com/philipgreat/index.html',{ waitUntil: 'networkidle0'});
  clickShot('.icon-item-box .anticon-apartment','platform.png');
  await page.waitForTimeout(6000);

  //[working] add merchant
  clickShot('.anticon-shop','add_merchant.png')
  await page.waitForTimeout(6000);

  await page.type('input.ant-input-lg', '商户01');
  await page.screenshot({path: 'add_merchant_01.png'});

  await page.click('.ant-btn-primary span');
  await page.waitForTimeout(5000);

  await page.type('input.ant-input-lg', '商户01');
  await page.type('//form/div/div[3]/div/div[2]/div/span/div/div/div/ul/li/div/span/input', '农商科技(M004094)');
  await page.screenshot({path: 'add_merchant_02.png'});

  await page.click('.ant-btn-primary span');
  await page.waitForTimeout(2000);

  await page.waitForSelector('.ant-result-title');
  await page.click('.ant-btn-primary span');
  await page.waitForTimeout(2000);

  // platform menu
  mulitClickShot('#submenu-vg0 .ant-menu-submenu-title','#platform-P000001-merchantList', 'platform_p01_merchantList.png');
  await page.waitForTimeout(6000);

  mulitClickShot('#submenu-vg1 .ant-menu-submenu-title','#platform-P000001-productList', 'platform_p01_productList.png');
  await page.waitForTimeout(6000);

  mulitClickShot('#submenu-vg2 .ant-menu-submenu-title','#platform-P000001-userList', 'platform_p01_userList.png');
  await page.waitForTimeout(6000);

  mulitClickShot('#submenu-vg3 .ant-menu-submenu-title','#platform-P000001-tenderingList', 'platform_p01_tenderingList.png');
  await page.waitForTimeout(6000);

  mulitClickShot('#submenu-vg3 .ant-menu-submenu-title','#platform-P000001-tenderAwardAnnouncementList', 'platform_p01_tenderAwardAnnouncementList.png');
  await page.waitForTimeout(6000);
  
  mulitClickShot('#submenu-vg4 .ant-menu-submenu-title','#platform-P000001-contractOrderList', 'platform_p01_contractOrderList.png');
  await page.waitForTimeout(6000);
  
  mulitClickShot('#submenu-vg5 .ant-menu-submenu-title','#platform-P000001-returnOrderList', 'platform_p01_returnOrderList.png');
  await page.waitForTimeout(6000);

  mulitClickShot('#submenu-vg6 .ant-menu-submenu-title','#platform-P000001-smartScaleList', 'platform_p01_smartScaleList.png');
  await page.waitForTimeout(6000);

  mulitClickShot('#submenu-vg7 .ant-menu-submenu-title','#platform-P000001-changeRequestList', 'platform_p01_changeRequestList.png');
  await page.waitForTimeout(6000);  


  // secUser
  await page.goto('http://lab.doublechaintech.com/philipgreat/index.html',{ waitUntil: 'networkidle0'});
  clickShot('.icon-item-box .anticon-lock','secUser.png');
  await page.waitForTimeout(6000);

  // secUser menu
  clickShot('#secUser-SU000001-userAppList', 'secUser_su01_userAppList.png');
  await page.waitForTimeout(6000);

  clickShot('#secUser-SU000001-loginHistoryList', 'secUser_su01_loginHistoryList.png');
  await page.waitForTimeout(6000);

  clickShot('#secUser-SU000001-wechatWorkappIdentityList', 'secUser_su01_wechatWorkappIdentityList.png');
  await page.waitForTimeout(6000);

  clickShot('#secUser-SU000001-wechatMiniappIdentityList', 'secUser_su01_wechatMiniappIdentityList.png');
  await page.waitForTimeout(6000);

  clickShot('#secUser-SU000001-keyPairIdentityList', 'secUser_su01_keyPairIdentityList.png');
  await page.waitForTimeout(6000);

  // userDomain
  await page.goto('http://lab.doublechaintech.com/philipgreat/index.html',{ waitUntil: 'networkidle0'});
  clickShot('.icon-item-box .anticon-team','userDomain.png');
  await page.waitForTimeout(6000);

  clickShot('#userDomain-UD000001-secUserList', 'userDomain_ud01_secUserList.png');
  await page.waitForTimeout(6000);

  clickShot('#userDomain-UD000001-publicKeyTypeList', 'userDomain_ud01_publicKeyTypeList.png');
  await page.waitForTimeout(6000);

  // [TODO] switch App
  // const dropdown = await page.$('.ant-dropdown-trigger .anticon-appstore');
  // await dropdown.focus();
  // await page.screenshot({path: 'focusOn_01.png'});

  // await page.click('.ant-dropdown-trigger .anticon-appstore');
  // await page.waitForTimeout(1000);
  // await page.screenshot({path: 'focusOn_01.png'});

})();

