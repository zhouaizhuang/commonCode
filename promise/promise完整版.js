const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function resolvePromise(retValue,resolve,reject){
  if(retValue instanceof Mypromise) { //resolve或reject传入promise实例
    retValue.status === PENDING ? retValue.then(ret => resolvePromise(ret,resolve,reject), error => reject(error)) : retValue.then(resolve,reject)
  }else{
    resolve(retValue)
  }
}
class Mypromise {
  constructor(executor) {
    this.status = PENDING
    this.result = null
    this.resolveArr = []
    this.rejectedArr = []
    const resolve = val => {
      if(val instanceof Mypromise) { return val.then(resolve, reject) }
      if(this.status !== PENDING) { return }
      this.status = FULFILLED
      this.result = val
      this.resolveArr.forEach(fn => fn(value))
    }
    const reject = err => {
      if(err instanceof Mypromise) { return err.then(resolve, reject) }
      if(this.status !== PENDING) { return }
      this.status = REJECTED
      this.result = err
      this.rejectedArr.forEach(fn => fn(err))
    }
    try{
      executor(resolve, reject)
    }catch(e) {
      reject(e)
    }
  }
  then(onResolve, onRejected) {
    onResolve = typeof onResolve === 'function' ? onResolve : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : v => v
    if(this.status === FULFILLED) {
      return new Mypromise((resolve, reject) => resolvePromise(onResolve(this.result), resolve, reject))
    } else if(this.status === REJECTED) {
      return new Mypromise((resolve, reject) => onRejected(this.result))
    }else if(this.status === PENDING) {
      return new Mypromise((resolve, reject) => {
        this.resolveArr.push(() => resolvePromise(onResolve(this.result), resolve, reject))
        this.rejectedArr.push(() => resolvePromise(onRejected(this.result), resolve, reject))
      })
    }
  }
  catch(onReject){
    return this.then(null, onReject)
  }
  finally(callBack){
    return this.then(callBack, callBack)
  }
}
var p = new Mypromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
p.then(res => {
  console.log(res + '=======')
  return 3
}).then(res => {
  console.log(res + '------')
})