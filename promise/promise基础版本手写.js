// // 1、promise是一个构造函数
// // 2、new Promise 时传入一个执行函数，并且执行函数是立即执行的
// // 3、执行函数接收两个参数， resolve函数和reject函数、并且能够接收参数
// // 4、promise的实例上有个then方法，then方法接收两个参数
// const PENDING = 'pending'
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'
// class BasicPromise {
//   constructor(exector) {
//     this.state = PENDING
//     this.value = undefined
//     this.reason = undefined
//     this.resolveCbs = []
//     this.rejectCbs = []
//     const resolve = value => {
//       if(this.state === PENDING) {
//         this.state = FULFILLED
//         this.value = value
//         this.resolveCbs.forEach(res => onfulfilled(res))
//       }
//     }
//     const reject = reason => {
//       if(this.state === PENDING) {
//         this.state = REJECTED
//         this.reason = reason
//         this.rejectCbs.forEach(err => onrejected(err))
//       }
//     }
//     try {
//       exector(resolve, reject)
//     } catch(e) {
//       console.log(e)
//     }
//   }
//   then(onfulfilled, onrejected){
//     if(this.state === FULFILLED) {
//       setTimeout(() => onfulfilled(this.value), 0)
//     } else if(this.state === REJECTED){
//       setTimeout(() => onrejected(this.value), 0)
//     } else {
//       this.resolveCbs.push(res => setTimeout(() => onfulfilled(res), 0))
//       this.rejectCbs.push(err => setTimeout(() => onrejected(err), 0))
//     }
//   }
// }


// // 测试
// const p = new BasicPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(222)
//   }, 2000)
// })
// p.then(value => {
//   console.log('value1', value)
// })
// p.then(res => {
//   console.log('value2', res)
// })




function MyPromise(fn) {
  this.cbs = []
  const resolve = (res) => {
    setTimeout(() => {
      this.cbs.forEach(cb => cb(res))
    }, 0)
  }
  fn(resolve)
}
MyPromise.prototype.then = function (onResolved) {
  return new MyPromise((resolve) => {
    this.cbs.push((res) => {
      const result = onResolved(res)
      if (result instanceof MyPromise) {
        result.then(resolve)
      } else {
        resolve(res)
      }
    })
  })
}
// 测试
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(222)
  }, 2000)
})
p.then(value => {
  console.log('value1', value)
  return value
}).then(res => {
  console.log('value2', res)
})