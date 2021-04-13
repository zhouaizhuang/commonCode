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
function promisePro(func){
  let _resolve, _reject
  return {
    allowAbortPromise: function (){
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