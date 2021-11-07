var Chain = function (fn){
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor){
  return this.successor = successor
}
Chain.prototype.passRequest = function (){
  var ret = this.fn.apply(this, arguments)
  if(ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
}
Chain.prototype.next = function () { // 支持异步
  return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}
var fn1 = new Chain(function (type) {
  if(type === 1) {
    console.log('500元定金预购，得到100元代金券')
  } else {
    return 'nextSuccessor'
  }
})
var fn2 = new Chain(function (type){
  if(type === 2) {
    console.log('200元定金预购，得到50元代金券')
  } else {
    return 'nextSuccessor'
  }
})
var fn3 = new Chain(function (type){
  if(type === 3) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('默认值')
  }
})
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest(1)
// ==========个人认为更好的做法========
var order = function (orderType, pay, stock) {
  if(orderType === 1 && pay === true) { return order500()}
  if(orderType === 2 && pay === true) { return order200()}
  if(orderType === 3 && pay === true) { return orderNormal()}
  if(stock <= 0) { return empty()}
  return def()
}
function order500(){
  console.log('500元定金预购，得到100元代金券')
}
function order200(){
  console.log('200元定金预购，得到50元代金券')
}
function orderNormal(){
  console.log('普通购买，无优惠券')
}
function empty(){
  console.log('手机库存不足')
}
function def(){
  console.log('默认值')
}