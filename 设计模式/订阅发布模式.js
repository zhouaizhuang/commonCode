// 订阅发布模式：作用，模块之间解耦
// 简单的订阅发布模式
class Event {
  constructor(){
    this.callbacks = {}
  }
  $on(name, fn) {
    (this.callbacks[name] || (this.callbacks[name] = [])).push(fn)
  }
  $emit(name, arg){
    let cbs = this.callbacks[name]
    if(cbs) {
      cbs.forEach(v => v.call(this, arg))
    }
  }
  $off(name) {
    this.callbacks[name] = null
  }
}
// 使用方式
let myEvent = new Event()
myEvent.$on('event1', function(arg){
  console.log('事件1', arg)
})
myEvent.$on('event1', function(arg){
  console.log('又是一个事件1', arg)
})
myEvent.$on('event2', function(arg){
  console.log('事件2', arg)
})
myEvent.$emit('event1', {name: "开课了"})
myEvent.$emit('event2', {name: "全栈"})
myEvent.$off('event1') // 取消订阅事件event1
myEvent.$emit('event1', {name: "写代码"}) // 由于event1被取消了，此处就没event1的回调了




// ------------------------------------------------------------------------------------------------------------------------
// --------------------------分割线----------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------
// 实际应用场景。原始代码，强耦合
class A {
  action() {
    console.log('hi~我是A模块')
  }
}
class C {
  sayHi(){
    let a = new A()
    a.action() // 此处C模块调用A模块中方法，对A模块强依赖。如果A模块对方法有改动。会产生很严重的bug
  }
}
// ==============>改造============>
class A {
  constructor() {
    myEvent.$on('event1', () => {
      console.log('hi~我是A模块')
    })
  }
}
class C {
  sayHi(){
    myEvent.$emit('event1') // 此处C模块不直接调用A模块中方法，就算A模块注册事件没有，程序仍然是正常的
  }
}