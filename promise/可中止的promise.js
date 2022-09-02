// 可中止的promise
 class AllowCancelPromise {
  constructor() {
    this._pendingPromise = new Map()
    this._reject = new Map()
  }
  request(requestFn, url) {
    url = url.replace('/', '_')
    if (this._pendingPromise.get(url)) { this.cancel('取消重复请求', url) }
    const promiseA = new Promise((_, reject) => this._reject.set(url, reject))
    this._pendingPromise.set(url, Promise.race([requestFn(), promiseA]))
    return Promise.race([requestFn(), promiseA]).then(res => {
      this._pendingPromise.delete(url)
      this._reject.delete(url)
      return res
    })
  }
  cancel(reason, url) {
    this._reject.get(url) && this._reject.get(url)(reason)
    this._pendingPromise.delete(url)
    this._reject.delete(url)
  }
}


/*
 *********************************************************
 * *************这里是测试代码******************************
 * ********************************************************
 */
const allowCancelPms = new AllowCancelPromise()
function promiseA() {
  return () => new Promise(resolve => { setTimeout(() => { resolve('最后赢家是我+++++') }, 1000) })
}
function promiseB() {
  return () => new Promise(resolve => { setTimeout(() => { resolve('最后赢家是我======') }, 1000) })
}
for(let i = 0; i < 5; i++) {
  allowCancelPms.request(promiseA(), '/xxx').then((res) => console.log(res)).catch((err) => console.error(err)) // 前四个 取消重复请求
  allowCancelPms.request(promiseB(), '/YYY').then((res) => console.log(res)).catch((err) => console.error(err)) // 前四个 取消重复请求
}
setTimeout(() => {
  for (let i = 0; i < 5; i++) {
    allowCancelPms.request(promiseA(), '/xxx').then((res) => console.log(res)).catch((err) => console.error(err)) // 前四个 取消重复请求
    allowCancelPms.request(promiseB(), '/YYY').then((res) => console.log(res)).catch((err) => console.error(err)) // 前四个 取消重复请求
  }
}, 5e3)

