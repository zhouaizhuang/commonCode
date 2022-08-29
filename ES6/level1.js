// 将如下代码，改造为以数组解构赋值实现
let a = 1
let b = 2
let c = 3



// 将如下代码，改造为以对象解构赋值实现
let obj = { name: '小明', school: '清华大学' }
let name = obj.name
let age = obj.age






// 用es6模板字符串对字符串优化
let company = 'A公司'
let year = '3'
let str = company + '成立' + year + '年了'







// 运用es6函数相关知识，进行es6改造，代码精简
function calcName(firstName, secondName, age){
  firstName = firstName || '张'
  secondName = secondName || '三'
  age = age || '18'
  if(age < 18) {
    return firstName + secondName + '未成年'
  } else {
    return firstName + secondName + '成年了'
  }
}






// 使用es6中的...剩余参数进行数据合并。期望得到 [1, 2, 3, 4, 5]
const arr1 = [1, 2, 3]
const arr2 = [4, 5]







