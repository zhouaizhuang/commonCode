
/**
 * 在Vue项目中，有一个实习生写的函数是这样的，调用/userInfo/list接口获取数据后，将数据处理后，进行赋值。并渲染到页面上
 * 希望你能在不改变原有功能的情况下，凭借自己掌握的js技术，优化这段代码。
 * 预期：优化到你认为最合适的版本。
 */
// 原始代码如下
// function getList(){
//   this.spinning = true // 显示loading
//   var that = this
//   post('/userInfo/list').then(function(res) { // post请求请求到数据。
//     var list = res.data.list // 用于渲染的数据列表
//     that.total = res.data.total // 总页数
//     if(list.length > 0) {
//       that.list = list.map((item, index) => {
//         list[index].num = index + 1 // 序号
//         return item
//       })
//     }
//     this.spinning = false // 关闭loading
//   })
// }
/**************此处完善代码******************* */
function getList(){
  this.spinning = true // 显示loading
  var that = this
  post('/userInfo/list').then(function(res) { // post请求请求到数据。
    var list = res.data.list // 用于渲染的数据列表
    that.total = res.data.total // 总页数
    if(list.length > 0) {
      that.list = list.map((item, index) => {
        list[index].num = index + 1 // 序号
        return item
      })
    }
    this.spinning = false // 关闭loading
  })
}








// 中级工程师代码水准
// 评价：
// 优点：增加了部分数据的默认值处理。使用es6精简了代码。
// 缺点：没有使用同步代码，异常处理没做、用于线上环境的话代码可靠性仍然不佳。
// 在后台返回的数据存在一定瑕疵的情况下代码依旧能完美运行
function getList(){
  this.spinning = true // 显示loading
  post('/userInfo/list').then(res => { // post请求请求到数据。
    const { list, total } = res.data || {}
    this.total = total
    this.list = list.map((item, index) => {
      item.num = index + 1 // 序号
      return item
    })
    this.spinning = false // 关闭loading
  })
}





// 高级工程师代码水准
// 评价：
// 优点：es6精简了代码能使用同步加载代码试下、对数据可能出现的异常进行了默认值处理、同时增加了异常处理函数
// 缺点：没有明显缺点
// 在后台返回的数据存在一定瑕疵的情况下代码依旧能完美运行
async function getList(){
  try {
    this.spinning = true // 显示loading
    var { data: { list = [], total = 0 } } = await post('/xxx/list') // post请求请求到数据。
    this.total = total || 0 // 总页数
    this.list = (list || []).map((item, index) => ({ ...item, num: index + 1 }))
    this.spinning = false // 关闭loading
  } catch(e) {
    console.log(e)
  }
}

