// 核心作用是为了保证代码模块清晰

/** 建造者只关心他需要的整体，细节让其他人实现。可以封装成函数。去各自实现*/
function convertData(){
  const data = [
    {firstName: '张', secondName: '三', salary: 8000, reward: 1000, age: 18},
    {firstName: '李', secondName: '四', salary: 8000, reward: 800, age: 28},
    {firstName: '王', secondName: '五', salary: 6000, reward: 500, age: 19},
  ]
  return data.map(v => {
    return {
      ...v,
      name: v.firstName + v.secondName,
      totalSalary: v.salary * 12 + v.reward,
    }
  })
}




// 事例2
var Person = function (name, work){
  var _person = new Human()
  _person.name = new Named(name)
  _person.work = new Named(work)
  return _person
}
var person = new Person('xiao ming', 'software engineer')
console.log(person)


