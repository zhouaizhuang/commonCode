// 1、promise是一个构造函数
// 2、new Promise 时传入一个执行函数，并且执行函数是立即执行的
// 3、执行函数接收两个参数， resolve函数和reject函数、并且能够接收参数
// 4、promise的实例上有个then方法，then方法接收两个参数
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class BasicPromise {
  constructor(exector) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onfulfilledCallbacks = []
    this.onrejectedCllbacks = []
    const resolve = value => {
      if(this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onfulfilledCallbacks && this.onfulfilledCallbacks.forEach(onfulfilled => onfulfilled(value))
      }
    }
    const reject = reason => {
      if(this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onrejectedCllbacks && this.onrejectedCllbacks.forEach(onrejected => onrejected(reason))
      }
    }
    try {
      exector(resolve, reject)
    } catch(e) {
      console.log(e)
    }
  }
  then(onfulfilled, onrejected){
    if(this.state === FULFILLED) {
      typeof onfulfilled === 'function' && setTimeout(() => onfulfilled(this.value), 0)
    } else if(this.state === REJECTED){
      typeof onrejected === 'function' && setTimeout(() => onrejected(this.value), 0)
    } else {
      if(typeof onfulfilled === 'function') {
        this.onfulfilledCallbacks.push(value => setTimeout(() => onfulfilled(value), 0))
      }
      if(typeof onrejected === 'function') {
        this.onrejectedCllbacks.push(reason => setTimeout(() => onrejected(reason), 0))
      }
    }
  }
}


// 测试
const p = new BasicPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(222)
  }, 2000)
})
p.then(value => {
  console.log('value1', value)
})
p.then(res => {
  console.log('value2', res)
})