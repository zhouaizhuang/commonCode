/**
 * 1、需求：公司给员工发年终奖，
 * 请编写一个函数，给每个员工计算他对应的年终奖。
 * 描述:字段level代表绩效、  字段salary代表月薪    字段yearEndBonus代表年终奖
 * 绩效 'S' ---> 对应4个月月薪的年终奖
 * 绩效 'A' ---> 对应2个月月薪的年终奖
 * 绩效 'B' ---> 对应1个月月薪的年终奖
 * 绩效为其他值，或者不存在，则没有年终奖
 * 举例
 * const arr = [
 *  {id:'1', name:'张三', level: 'B', salary: 8000, yearEndBonus: 0, age: 25, city: '南京'},
 *  {id:'5', name:'李四', level: 'S', salary: 10000, yearEndBonus: 0, age: 29, city: '常州'},
 *  {id:'6', name:'王五', level: 'A', salary: 12000, yearEndBonus: 0, age: 35, city: '无锡'},
 *  {id:'6', name:'王五', level: '', salary: 12000, yearEndBonus: 0, age: 35, city: '无锡'},
 * ]
 * 执行： computeMoney(arr)
 * 返回值： const arr = [
 *  {id:'1', name:'张三', level: 'B', salary: 8000, yearEndBonus: 8000, age: 25, city: '南京'},
 *  {id:'5', name:'李四', level: 'S', salary: 10000, yearEndBonus: 40000, age: 29, city: '常州'},
 *  {id:'6', name:'王五', level: 'A', salary: 12000, yearEndBonus: 24000, age: 35, city: '无锡'},
 *  {id:'6', name:'王五', level: '', salary: 12000, yearEndBonus: 0, age: 35, city: '无锡'},
 * ]
 * 
 * @param {Array} arr 
 * @returns {Array} 
*/
function computeMoney(arr){
  // 此处编写实现
  // ...
  return newArr
}














// 初中级工程师
function computeMoney(arr){
  return arr.map(item => {
    const {level, salary} = item
    if(level === 'S') {
      item.yearEndBonus = salary * 4
    } else if(item.level === 'A') {
      item.yearEndBonus = salary * 2
    } else if(item.level === 'B'){
      item.yearEndBonus = salary
    } else {
      yearEndBonus = 0
    }
    return item
  })
}
// 中高级工程师
const levelS = val => 4 * val
const levelA = val => 2 * val
const levelB = val => 1 * val
const mapSalary = {
  'S': levelS,
  'A': levelA,
  'B': levelB
}
function computeMoney(arr){
  return arr.map(item => {
    const {level, salary} = item
    item.yearEndBonus = mapSalary[level] ? mapSalary[level](salary) : 0
    return item
  })
}

