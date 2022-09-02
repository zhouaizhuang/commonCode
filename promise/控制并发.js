class Scheduler {
  constructor(limit) {
    this.queue = []
    this.limit = limit
    this.count = 0
  }
  add(fn) {
    this.queue.push(fn)
  }
  taskStart() {
    for(let i = 0; i < this.limit; i++) {
      this.request()
    }
  }
  request() {
    if (!this.queue.length || this.count >= this.limit) return
    this.count++
    this.queue.shift()().then(() => {
      this.count--
      this.request()
    })
  }
}
// 测试代码： 由于线程数为2，那么promiseB返回后，加入执行promiseC, 完成后加入promiseD，promiseA返回，之后promiseD返回
const scheduler = new Scheduler(2);
const promiseA = () => new Promise((resolve, reject) => { setTimeout(() => { console.log(1000);resolve('') }, 1e3)})
const promiseB = () => new Promise((resolve, reject) => { setTimeout(() => { console.log(500);resolve('') }, 500)})
const promiseC = () => new Promise((resolve, reject) => { setTimeout(() => { console.log(300);resolve('') }, 300)})
const promiseD = () => new Promise((resolve, reject) => { setTimeout(() => { console.log(400);resolve('') }, 400)})
scheduler.add(promiseA)
scheduler.add(promiseB)
scheduler.add(promiseC)
scheduler.add(promiseD)
scheduler.taskStart()
