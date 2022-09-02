
// https://mp.weixin.qq.com/s/E9QcGvg0iAiFtOMngDIz-w
/***************接口请求超时解决：************** */ 
// 场景：请求8s还没给到，认为是网络问题。让用户跳转到请检查网络连接页面
// 实现原理：定义一个promise，变量名p1 ------>  8s后就跳转到检查网络连接的页面
// 使用promise.race([])，如果8s内没有请求返回的话，那么就会被p1竞争过去。直接跳转，而且其他的promise请求被取消
function goNetworkErr(href = '', time = 8e3){
  return new Promise((resolve, reject) => {
    setTimeout(() => window.location.href = href, time)
  })
}
// 假定正常项目封装的axios请求的方法为get
function raceRequest(fn){
  return Promise.race([fn(), goNetworkErr('https://www.baidu.com')])
}

const promiseA = () => get('/list', { page:2 })
const [data] = await raceRequest(promiseA())

