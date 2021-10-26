  /**
   * 1、编写一个函数，取出数组中age字段大于30的人的id，并且用,分割
   * 举例
   * const arr = [
   *  {id:'1', name:'张三', age: 18, city: '南京'},
   *  {id:'5', name:'李四', age: 32, city: '常州'},
   *  {id:'6', name:'王五', age: 35, city: '无锡'},
   * ]
   * console.log(getAgeGt30(arr)) // '5,6'
   * @param {Array} arr 
   * @returns {String}
   */
  function getAgeGt30(arr){
    // 此处编写实现
    // ...
    return str
  }










  
/**
 * *********************************************
 * 初级工程师
 * 1、能实现需求。但是实现通常不稳定，一些特定的场景会产生bug
 * 2、代码通常啰里啰嗦、可读性较差，性能通常不是初级工程师的考量因素，更多的是思考如何实现
 * **********************************************
 */
// 事例一
// 评价：可读性 5    性能 10   代码简洁程度 5    复用价值 0
// 使用场景：线上环境原则上不要写这种代码
function getAgeGt30(arr){
  let str = ''
  for(let item in arr) {
    if(item.age > 30) {
      if(str === '') {
        str += item.id
      } else {
        str += ',' + item.id
      }
    }
  }
  return str
}
// 事例二
// 评价：可读性5    性能 10   代码简洁程度 5    复用价值 0
// 使用场景：线上环境原则上不要写这种代码
function getAgeGt30(){
  let str = ''
  arr.forEach(item => {
    if(item.age > 30) {
      if(str === '') {
        str += item.id
      } else {
        str += ',' + item.id
      }
    }
  })
  return str
}

/**
 * *********************************************
 * 中级工程师
 * 除了能做到基础实现。还能权衡性能、可读性。且能用更清晰、简洁、性能相对较好的方式实现
 * 
 * **********************************************
 */
// 1、高可读性写法
// 评价：可读性10    性能 7   代码简洁程度 10    复用价值： 0
// 使用场景：数据量少时，这是最佳实践
function getAgeGt30(arr){
  return arr.filter(v => v.age > 30).map(v => v.id).join(',')
}
// 1、适当降低可读性。但大量提高性能的写法
// 评价：可读性8    性能 10   代码简洁程度 8   复用价值： 0
// 使用场景: 有大量数据需要处理时，这是最佳实践
function getAgeGt30(arr){
  return arr.reduce((prev, item) => {
    const str = item.age > 30 ? item.id : ''
    return prev === '' ? prev + str : prev + ',' + str
  }, '')
}

/**
 * *********************************************
 * 高级工程师
 * 1、除了考虑尽量清晰、简洁、高性能实现。
 * 2、还要抽象的思考，将逻辑复用。以后编写代码能复用之前实现的逻辑。减少后续开发时间
 * **********************************************
 */
// 封装一个函数功能是： 取出数组中，特定的字段。
// 这次的需求是取出数组中年龄大于30的id字段。那么可以先筛选出年龄大于30的人。然后用这个封装的函数直接取出id字段。
function getField(arr, field, split = ',') {
  return arr.reduce((prev, item) => [...prev, item[field]], []).join(split)
}
// 写法1: 高级工程师
// 评价：可读性8    性能 8   代码简洁程度：10     复用价值：10
// 进行了函数封装。如果下次取值换成了大于30岁的人的名字，那么下面的id只需要改为name就能实现了。可维护性很强
// 使用场景: 有大量数据需要处理时，这是最佳实践
function getAgeGt30(arr){
  return getField(arr.filter(v => v.age > 30), 'id')
}





