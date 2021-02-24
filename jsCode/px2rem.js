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
