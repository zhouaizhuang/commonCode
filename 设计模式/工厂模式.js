// 场景： 需要生成很多对象
var p1 = {name: '张三', age: '18', school:'清华大学'}
var p2 = {name: '李四', age: '22', school:'清华大学'}

// 构建个人信息
function createPerson(name, age, job) {
  return {
    name,
    age,
    sayJob: function () {
      console.log(job);
    }
  }
}
var person1 = createPerson('zxj', 23, "Software Engineer")
var person2 = createPerson('sdf', 25, "Software Engineer")
console.log(person1)
console.log(person2)