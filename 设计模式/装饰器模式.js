// 核心作用是为了实现功能扩展


Function.prototype.before=function (beforefn) {
  var _this= this                               //保存旧函数的引用
  return function () {                           //返回包含旧函数和新函数的“代理”函数
      beforefn.apply(this,arguments)            //执行新函数,且保证this不被劫持,新函数接受的参数 // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
      return _this.apply(this,arguments)
  }
}
Function.prototype.after=function (afterfn) {
  var _this=this
  return function () {
      var ret=_this.apply(this,arguments)
      afterfn.apply(this,arguments)
      return ret
  }
}
const username = {
  value: ''
}
const password = {
  value: ''
}
var validata = function(){
  if ( username.value === '' ){
    alert ( '用户名不能为空' );
    return false;
  }
  if ( password.value === '' ){
    alert ( '密码不能为空' );
    return false;
  }
}
var formSubmit=function () {
  if (validata() === false){ return }// 校验未通过
  var param = {
    username: username.value,
    password: password.value
  }
  ajax('post','http://www.mn.com',param);
}
formSubmit= formSubmit.before(validata);
submitBtn.onclick=function () {
  formSubmit();
}
// =====================================
// 不污染原型的实现
var before=function (fn, before) {
  return function () {
      before.apply(this,arguments);
      return fn.apply(this,arguments);
  }
}
function func1() {console.log('1')}
function func2() {console.log('2')}
var a = before(func1,func2)
a()