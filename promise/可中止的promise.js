// 可以提前中止的promise
/**
 * 1、基础版本
 * 只能解决一个请求函数
 */
function allowCancelRequest() {
  let _resolve, _reject
  return {
    request: function (url){
      return new Promise((resolve, reject) => {
        [_resolve, _reject] = [resolve, reject]
        setTimeout(() => resolve(url), 3000)
      })
    },
    abort: (options = {}) => {
      _reject({
        name: "abort",
        message: "中止promise请求",
        aborted: true,
        ...options
      })
    }
  }
}
const { request, abort } = allowCancelRequest()
request('/api/invoce').then(console.log).catch(console.log)
abort()

/**
 * 2、进阶版本，更通用
 * 可以解决任意一个promise函数的无法取消问题
 */
// 封装一个函数接收一个请求函数，返回一个执行请求函数的方法，和中止请求函数的方法
function promisePro(func){
  let _resolve, _reject
  return {
    allowAbortPromise: () => {
      return new Promise((resolve, reject) => {
        [_resolve, _reject] = [resolve, reject]
        func && func(resolve, reject)
      })
    },
    abort: (options = {}) => {
      _reject({
        message: "中止了promise请求",
        ...options
      })
    }
  }
}
function getUserList(resolve, reject){
  setTimeout(() => {
    resolve([{name:"张三", age: 18}, {name:"李四", age: 17}])
  },3000)
}
const { allowAbortPromise, abort } = promisePro(getUserList)
allowAbortPromise().then(console.log).catch(e => console.log(e.message))
abort({message: "中止了获取用户列表getUserList的请求"})




/************3、promise.race方案************** */
function getPromiseWithAbort(p){
  let obj = {}
  //内部定一个新的promise，用来终止执行
  let p1 = new Promise(function(resolve, reject){
    obj.abort = reject
  })
  obj.promise = Promise.race([p, p1])
  return obj
}
var promise  = new Promise((resolve)=>{
  setTimeout(()=>{
    resolve('123')
  }, 3000)
 })
 var obj = getPromiseWithAbort(promise)
 obj.promise.then(res=>{console.log(res)})
 //如果要取消
 obj.abort('取消执行')





/***********4、使用全局变量控制********* */
export const guID = function () {
  return Number(Math.random().toString().substr(3, 8) + Date.now()).toString(36)
}
function getList(){
  // 假定在vue项目中this指向data中的数据
  this.currentId = guID()
  request('').then(res => {
    if(res.currentId === this.currentId) {
      this.setData({list: res})
    }
  }).catch(console.log)
}



// https://mp.weixin.qq.com/s/E9QcGvg0iAiFtOMngDIz-w
/***************接口请求超时解决：************** */ 
// 场景：请求8s还没给到，认为是网络问题。让用户跳转到请检查网络连接页面
// 实现原理：定义一个promise，变量名p1 ------>  8s后就跳转到检查网络连接的页面
// 使用promise.race([])，如果8s内没有请求返回的话，那么就会被p1竞争过去。直接跳转，而且其他的promise请求被取消
function goNetworkErr(href = '', time = 8e3){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      window.location.href = href
    }, time)
  })
}
// 假定正常项目封装的axios请求的方法为get
function raceRequest(){
  return Promise.race([get('/list', {page:2}), goNetworkErr('www.baidu.com')])
}






