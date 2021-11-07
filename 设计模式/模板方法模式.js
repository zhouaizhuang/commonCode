// 模板方法通常用于构建项目
var Beverage = function (params) {
  var boilWater = function (){ console.log('把水煮沸') }
  var brew = params.brew || function (){throw new Error('必须传递brew方法')}
  var pourInCup = params.pourInCup || function (){throw new Error('必须传递pourInCup方法')}
  var addCondiments = params.addCondiments || function (){throw new Error('必须传递addCondiments方法')}
  var F = function (){}
  F.prototype.init = function (){ boilWater(); brew(); pourInCup(); addCondiments(); } // 模板中规定了函数执行顺序
  return F
}
var Coffee = Beverage({ // 生成咖啡需要的各个步骤对应函数传入
  brew: function (){console.log('用沸水冲泡咖啡')},
  pourInCup: function (){console.log('把咖啡倒进杯子')},
  addCondiments: function (){console.log('加糖和牛奶')},
})
var coffee = new Coffee()
coffee.init()