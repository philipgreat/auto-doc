const puppeteer = require('puppeteer')

;(async () => {
  const brower = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--enable-automation']
  })
  const page = await brower.newPage()
  await page.goto('https://www.tcpjw.com/passport/login', {
    waitUntil: 'networkidle2'
  })

  await taobaoCaptchaBehavior(page)

  //await brower.close();
})().catch(error => {
  console.log(error)
})

async function taobaoCaptchaBehavior (page) {
  console.log('验证码start')
  await page.evaluate(async () => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false })
  })
  // 等待滑块出现
  var slide_btn = await page
    .waitForSelector('#nc_1_n1t', { timeout: 30 * 1000 })
    .catch(e => {
      console.log('淘宝--滑块验证码不存在')
      console.log(e)
    })
  // 计算滑块距离
  const rect = await page.evaluate(slide_btn => {
    const { top, left, bottom, right } = slide_btn.getBoundingClientRect()
    return { top, left, bottom, right }
  }, slide_btn)
  console.log(rect)
  rect.left = rect.left + 10
  rect.top = rect.top + 10
  const mouse = page.mouse

  await mouse.move(rect.left, rect.top, { steps: 1 })
  // await simulateMove(page, rect.left, rect.top, {steps: 1})
  // 关键点2
  await page.touchscreen.tap(rect.left, rect.top) // h5需要手动分发事件 模拟app的事件分发机制。
  await mouse.down()

  let number = await randomInt(400, 800)

  await simulateMove(
    page,
    rect.left,
    rect.top,
    rect.right + number,
    rect.bottom,
    { steps: 1 }
  )

  await page.touchscreen.tap(rect.right + number, rect.bottom)
  await mouse.up()
  console.log(
    '淘宝反自动化识别====' + (await page.evaluate('navigator.webdriver'))
  )
  console.log('验证码end')
}

/**
 * 随机轨迹移动
 * @param page
 * @returns {Promise<void>}
 */
async function simulateMove (page, startX, startY, endX, endY, options = {}) {
  const mouse = page.mouse
  //随机移动 5次以内  随机长度
  let len = await randomInt(5)
  let xNumber = await endX
  let currentX = 0
  let xTemp = await randomInt(endX - startX)
  let yTemp = (await startY) + randomInt(5) //下幅度20内  y轴的改变不影响
  for (let i = 0; i < len; i++) {
    await mouse.move(currentX + xTemp, yTemp, options)
    currentX = (await xTemp) + currentX
    xTemp = await randomInt(endX - startX)
    xNumber = (await xNumber) - xTemp
    // await  page.waitFor(await randomInt(100, 20));
  }
  //补偿一个直接移动
  await mouse.move(startX + xTemp, endX)
  if (xNumber - startX > 0) {
    await mouse.move(xNumber, yTemp, options)
  }
}

/**
 *  random  范围  (minNumber,maxNumber];   minNumber 默认0
 * @param i
 * @returns {number}
 */
function randomInt (maxNumber, minNumber) {
  if (!minNumber) {
    ;``
    minNumber = 0
  }
  return Math.round(Math.random() * maxNumber) + 1 + minNumber
}
