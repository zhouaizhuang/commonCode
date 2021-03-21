// rem适配
(function (doc, win) {
  const docEl = doc.documentElement
  const metaEl = doc.querySelector('meta[name="viewport"]')
  const dpr = win.devicePixelRatio || 1
  let rem = 100 * (docEl.clientWidth * dpr / 750) // 这样子的话，就需要我们使用的值和设计稿物理像素一致
  rem > 200 && (rem = 200)
  var scale = 1 / dpr
  // 设置viewport，进行缩放，达到高清效果
  metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no')
  docEl.setAttribute('data-dpr', dpr) // 设置data-dpr属性，留作的css hack之用，解决图片模糊问题和1px细线问题
  docEl.style.fontSize = rem + 'px' // 动态写入样式
})(document, window)


/**检查浏览器是否是手机微信浏览器 */
(function (){
  var useragent = navigator.userAgent
  if (!useragent.match(/MicroMessenger/i) || !(navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！')
  }
})()


// 移动端真机调试核心代码
// 1、安装  npm install vconsole
// 然后在main.js中执行
import VConsole from 'vconsole'
let showVConsoleTimer = null
document.addEventListener('touchstart', function () {
  clearTimeout(showVConsoleTimer)
  showVConsoleTimer = setTimeout(() => {
    const vConsole = new VConsole()
  }, 8000)
})
document.addEventListener('touchend', function () {
  clearTimeout(showVConsoleTimer)
})
