/**
 * 1、在Vue项目中，有一个实习生写的函数是这样的，调用/userInfo/list接口获取数据后，将数据处理后，进行赋值。并渲染到页面上
 * 希望你能在不改变原有功能的情况下，优化这段代码。
 * 预期：优化到你认为合适的版本。
 */
async function getList(){
  this.spinning = true // 显示loading
  var res = await post('/userInfo/list') // post请求请求到数据。
  var list = res.data.list // 用于渲染的数据列表
  this.total = res.data.total // 总页数
  if(list.length > 0) {
    this.list = list.map((item, index) => {
      list[index].num = index + 1 // 序号
      return item
    })
  }
  this.spinning = false // 关闭loading
}















// 高级工程师
async function getList(){
  try {
    this.spinning = true // 显示loading
    var { data: { list = [], total = 0 } } = await post('/xxx/list') // post请求请求到数据。
    this.total = total || 0 // 总页数
    this.list = (list || []).map((item, index) => {
      item.num = index + 1 // 序号
      return item
    })
    this.spinning = false // 关闭loading
  } catch(e) {
    console.log(e)
  }
}

