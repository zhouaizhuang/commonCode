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
  let currentId = guID()
  request('').then(res => {
    if(res.currentId === currentId) {
      this.setData({list: res})
    }
  }).catch(console.log)
}