const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs')

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
  //await page.setViewport({ width: 1440, height: 900})
  await page.setViewport({ width: 1800, height: 1000})
  //await page.setDefaultNavigationTimeout(1000000);
  await page.setDefaultNavigationTimeout(0);

  var pageURL="https://www.pmdaniu.com/clouds/133784/62ddde7e8aac61d38a24bcd43d6f1aae-130884/13-系统管理-用户管理.html"
  await page.goto(pageURL,{ waitUntil: 'networkidle0'});
  
  /*

  await page.goto('https://www.pmdaniu.com/clouds/133784/62ddde7e8aac61d38a24bcd43d6f1aae-130884/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.html',{ waitUntil: 'networkidle0'});
  
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);

  console.log(data);
  */



  page.on('console', consoleObj => console.log(consoleObj.text()));
  
  const data = await page.evaluate(() => {
    const styleList=[];
    const elements = document.body.getElementsByTagName("*");
   
    return [...elements].map(element => {
      
      //element.style=dumpCSSText({element,parentElement:element.parentElement})
      //element.style.fontSize="150px";
      //element.removeAttribute("class")
      //element.removeAttribute("id")
      //element.style=getComputedStyle(element);
     
      //element.removeAttribute("class")
      //console.log(element,"=>");
      //cssText
      if(element.tagName==='img'){

        console.log("image=========>",element.innerHTML)

        element.setAttribute("data-item","--------------")
        
      }


      return element.tagName

      
      //return element+window.getComputedStyle(element).getPropertyValue("font-family");
    });

    console.log("style list length==============>",styleList.length)
  });

    


  //console.log(html);

  //await browser.close();


  
  
  //await page.screenshot({path: 'login-page.png'});
  
  // await page.type('input.ant-input-lg', '商户01');
  // await page.type('//form/div/div[3]/div/div[2]/div/span/div/div/div/ul/li/div/span/input', '农商科技(M004094)');
  // //await page.screenshot({path: 'add_merchant_02.png'});

  // await page.click('.ant-btn-primary span');
  // await page.waitForTimeout(2000);

  // await page.waitForSelector('.ant-result-title');
  // await page.click('.ant-btn-primary span');
  // await page.waitForTimeout(2000);



})();




/*
const  dumpCSSText2=(element)=>{
  var s = '';
  var o = getComputedStyle(element);
  for(var i = 0; i < o.length; i++){
    s+=o[i] + ':' + o.getPropertyValue(o[i])+';';
  }
  return s;
}


const  dumpCSSText=(element,parentElement)=>{
  var s = '';
  var elementStyle = getComputedStyle(element);
  var parentElementStyle=getComputedStyle(parentElement);
  for(var i = 0; i < elementStyle.length; i++){


    if(parentElement&&parentElementStyle.getPropertyValue&&(elementStyle.getPropertyValue(elementStyle[i]) === parentElementStyle.getPropertyValue(elementStyle[i]))){
      //continue;
    }


    s+=elementStyle[i] + ':' + elementStyle.getPropertyValue(elementStyle[i])+';';
  }
  return s;
}
*/