// 用解构赋值取出name和age
let arr = [{name: '张三', age: '18'}]
let name = arr[0].name
let age = arr[0].age




// 模板字符串
const locationList = [
  {province: '江苏省', city: '常州市', area: '新北区'},
  {province: '江苏省', city: '常州市', area: '钟楼区'},
  {province: '江苏省', city: '常州市', area: '天宁区'},
  {province: '江苏省', city: '常州市', area: '武进区'},
]
// =====> 预期  
// [
//   {province: '江苏省', city: '常州市', area: '新北区', address: '江苏省常州市新北区'},
//   {province: '江苏省', city: '常州市', area: '钟楼区', address: '江苏省常州市钟楼区'},
//   {province: '江苏省', city: '常州市', area: '天宁区', address: '江苏省常州市天宁区'},
//   {province: '江苏省', city: '常州市', area: '武进区', address: '江苏省常州市武进区'},
// ]




