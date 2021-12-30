// 节流防抖都是代理模式的实现
// 不直接执行目标函数，在执行目标函数之前先做一些过滤，从而控制对目标函数的访问频率
/***事例一：函数防抖 */
function debounce (fn, wait=3e3) {
  let timeout = null  // 使用闭包，让每次调用时点击定时器状态不丢失
  return function () { 
    clearTimeout(timeout) // 如果用户在定时器（上一次操作）执行前再次点击，那么上一次操作将被取消
    timeout = setTimeout(()=> fn(...arguments), wait)
  }
}


/***事例二：图片未加载成功时显示loading */
var imgFunc = (function(){
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function (src){
      imgNode.src = src
    }
  }
})()
var proxyImage = (function (){
  var img = new Image()
  img.onload = function (){
    imgFunc.serSrc(this.src)
  }
  return {
    setSrc: function (src){
      imgFunc.setSrc('./loading.gif')
      img.src = src
    }
  }
})()
proxyImage.setSrc('./pic.png')



