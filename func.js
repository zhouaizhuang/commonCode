/*
**************公共方法********************
*/
export const isType = type => val => type === Object.prototype.toString.call(val).slice(8, -1)
export const isArray = isType('Array')
export const isObject = isType('Object')
export const isNull = isType('Null')
export const isUndefined = isType('Undefined')
export const isFunction = isType('Function')
export const isRegExp = isType('RegExp')
export const isString = isType('String')
export const isNumber = isType('Number')
export const isDate = isType('Date')
export const isError = isType('Error')
// 深拷贝
export const deepCopy = function (obj) {
  if(!(isArray(obj) || isObject(obj))) { return obj }  // 数字、日期、正则、函数、字符串、undefined、null、Symbol直接返回
  let res = isArray(obj) ? [] : {}
  return Object.keys(obj).reduce((prev, item) => {
    prev[item] = (isArray(obj[item]) || isObject(obj[item])) ? deepCopy(obj[item]) : obj[item]
    return prev
  }, res)
}
// 获取唯一ID
export const guID = function () {
  return Number(Math.random().toString().substr(3, 8) + Date.now()).toString(36)
}
// 函数防抖
export const debounce = function (fn, wait=3e3) {
  let timeout = null  // 使用闭包，让每次调用时点击定时器状态不丢失
  return function () { 
    clearTimeout(timeout) // 如果用户在定时器（上一次操作）执行前再次点击，那么上一次操作将被取消
    timeout = setTimeout(()=> fn(...arguments), wait)
  }
}
// 函数节流
export const throttling = function  (fn, wait=3e3) {
  let timeout = null // 使用闭包，让每次调用时点击定时器状态不丢失
  let start = +new Date() // 记录第一次点击时的时间戳
  return function () {
    clearTimeout(timeout)
    let end = +new Date() // 记录第一次以后的每次点击的时间戳
    if (end - start >= wait) { // 当时间到达设置的延时时间则立即调用数据处理函数
      fn(...arguments)
      start = end // 执行处理函数后，将结束时间设置为开始时间，重新开始记时
    } else {
      timeout = setTimeout(() => fn(...arguments), wait) // 后续点击没有到达设置的延时，定时器设定延时进行调用
    }
  }
}
// 检测是否是手机号码
export const isPhoneNum = function(str) {
  // return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
  return /^1[3456789]\d{9}$/.test(str)
}
// 获取当前滚动距离顶部的距离
export const getScrollTop = function() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
}
// 获取操作系统类型
export const getOS = function() {
  const userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || ''
  // const vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || ''
  const appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || ''
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
}
// 获取元素相对于浏览器的位置, 返回一个对象
export const getPosition = function (e) {
  const offsety = Number(e.offsetTop)
  const offsetx = Number(e.offsetLeft)
  if (e.offsetParent !== null) {
    getPosition(e.offsetParent)
  }
  return { Left: offsetx, Top: offsety }
}
/**洗牌算法**/
// [1,2,3,4,5,6].sort(() => .5 - Math.random()) // 基础版本
export const shuffle = function (arr){
  let n = arr.length, random
  while(0!=n){
    random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
  }
  return arr
}
/**
 *  缓存函数计算结果
 * @举例 const cachedComputed = cached(function(val){ return val + 'ZZZ' })
 * @测试 cachedComputed('abc') ---> 'absZZZ' 第二次调用就不需要计算了直接取值 cachedComputed('abc') ---> 'absZZZ'
 * */ 
export const cached = function (fn) {
  const cache = {}
  return function (str) {
    return !cache[str] && (cache[str] = fn(str)), cache[str]
  }
}
/*
**************字符串操作********************
*/
// 去除字符串的首尾空格
export const trim = function (str = '') {
  return String(str).replace(/(^\s*)|(\s*$)/g, '')
}
// 固定裁剪几个字符之后显示省略号。举例：sliceStr('张三李四王五', 2) ----> "张三..."
export const sliceStr = function (str, num) {
  str = String(str)
  let newStr = str.substr(0, num)
  str.length > num && (newStr += '...')
  return newStr
}
// 字符串前置补0。举例: addZero('1', 2) ==> '01'
export const addZero = function (str, num) {
  return (Array(num+1).join('0') + str).slice(-num)
}
// 完美的统计字符串长度，能正确统计占四个字节的Unicode字符。举例：length('x\uD83D\uDE80y') ----> 3
export const length = function (str) {
  return [...str].length
}
/*
**************数组操作********************
*/
// 按照某个字段进行排序。
// 举例：sortByProp([{name:'ss', age:30}, {name:'dd', age:14}], 'age') ----> [{name:'dd', age:14}, {name:'ss', age:30}]
// increase不传默认升序， 传false降序
export const sortByProp = function (arr, str, increase = true) {
  return arr.sort((a, b) => increase ? a[str] - b[str] : b[str] - a[str])
}
/*
**************JSON操作********************
*/
// 格式化JSON, 将null, undefined,转换为''，否则后端会认为undefined和null为字符串导致bug
// 举例子：formatJSON({name:null, age:undefined, school: '清华大学'}) ---> {name:'', age:'', school: '清华大学'}
export const formatJSON = function (obj) {
  if(!isObject(obj)) { return {} }
  return Object.keys(obj).reduce((prev, item) => {
    prev[item] = isNull(obj[item]) || isUndefined(obj[item]) || ['undefined', 'null'].includes(obj[item]) ? '' : obj[item]
    return prev
  }, {})
}
// 检查表单必填项是否为空，空则返回第一个为空的字段名。
// 举例：checkParams({name:'张三', age:'', school:''}) ----> 'age'
export const checkJSON = function (obj) {
  return Object.keys(obj).find(item => !Boolean(obj[item])) || ''
}
// JSON转url
// 举例子： JSON2url('../advise/index', { from: 'index', id_str:'1243' }) -----> '../advise/index?from=index&id_str=1243'
export const JSON2url = function (url = '', params = {}){
  params = formatJSON(params)
  return Object.keys(params).reduce((prev, item, index) => {
    prev += index === 0 ? '?' : '&'
    prev += `${item}=${params[item]}`
    return prev
  }, url) || ''
}
/**
 * url转JSON
 * @举例 url2JSON('http://www.baidu.com?name=asd&age=12') ----> {name: "asd", age: "12"}
 */
export const url2JSON = function (url = '') {
  const paramsStr = url.includes('?') ? (url.split('?')[1] || '') : url
  return paramsStr.split('&').reduce((prev, item) => {
    const [key, val] = item.split('=')
    return { ...prev, [key]: val }
  }, {})
}
//base64数据导出文件，文件下载
/**
 * @举例 downloadFile('活动表格', 'http://xxxxxxx')
 */
export const downloadFile = function (filename, data){
  let DownloadLink = document.createElement('a')
  if (DownloadLink) {
    document.body.appendChild(DownloadLink)
    DownloadLink.style = 'display: none'
    DownloadLink.download = filename
    DownloadLink.href = data
    if (document.createEvent){
      let DownloadEvt = document.createEvent('MouseEvents')
      DownloadEvt.initEvent('click', true, false)
      DownloadLink.dispatchEvent(DownloadEvt)
    }
    else if ( document.createEventObject ){
      DownloadLink.fireEvent('onclick')
    } else if (typeof DownloadLink.onclick == 'function' ) {
      DownloadLink.onclick()
    }
    document.body.removeChild(DownloadLink)
  }
}

export const toFullScreen = function (){
  let el = document.documentElement;
  let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  //typeof rfs != "undefined" && rfs
  if (rfs) {
    rfs.call(el);
  }else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }else{
    alert("浏览器不支持全屏");
  }
}
// 退出全屏
export const exitFullscreen = function (){
  let el = parent.document;
  let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  //typeof cfs != "undefined" && cfs
  if (cfs) {
    cfs.call(el)
  }else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
    let wscript = new ActiveXObject("WScript.Shell")
    if (wscript != null) {
      wscript.SendKeys("{F11}")
    }
  }else{
    alert("切换失败,可尝试Esc退出")
  }
}
// 返回一个lower - upper之间的随机数
//random(0, 0.5) ==> 0.3567039135734613
//random(2, 1) ===> 1.6718418553475423
//random(-2, -1) ==> -1.4474325452361945
export const random = function (lower, upper){
    lower = +lower || 0
    upper = +upper || 0
    return Math.random() * (upper - lower) + lower
}
// 禁止复制
/*
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
      return event.returnValue = false
    })
})
*/
//递归解析数组中某个字段最深层该字段数组平铺。举例子：获取数组中每个对象的最深层的child属性
// const arr = [{ 
//   name: 'a',
//   child:[{
//       name:'b',
//       child: [ { name:'c' }]
//   }]
// }]
//getAreaFlat(arr, 'child')------> [{name:'c'}]
export const getAreaFlat = function (arr, props) {
  if(arr.some(item => isArray(item[props]) && item[props].length)) {
    arr = arr.reduce((prev, item) => isArray(item[props]) && item[props].length ? [...prev, ...item[props]] : [...prev, item], [])
    return getAreaFlat(arr, props)
  } else {
    return arr
  }
}
// 获取某个数组中某个字段的值，拼接成字符串。
// 举例： const arr = [{name:'a'}, {name:'b'}]
// getField(arr, 'name')----> 'a,b'
export const getField = function (arr, field, split = ',') {
  return arr.reduce((prev, item) => [...prev, item[field]], []).join(split)
}
// 获取某个数组中字段isChecked为true的条目。并取出其中特定字段。
// 举例：const arr = [{id:1, isChecked: true}, {id:2, isChecked:false}, {id:2, isChecked:true}]
// getChecked(arr, 'id')  ---> 1,2
export const getChecked = function (arr, field, checkStr = 'isChecked', split = ',') {
  return arr.reduce((prev, item) => (item[checkStr] && prev.push(item[field]), prev), []).join(split)
}
// 获取部分字段。举例：
// const obj = {name:'', age:123,school:{hh:11, kj:true}, asd:'qqwq'}
// getProps(obj, {name:'', school:{hh:''}, asd:''}) ----> 得到其中部分字段。这个函数可以用户提升小程序列表页和详情页大量数据的渲染性能
// 还可以直接传入对象数组像这种[{...},{...},{...},{...}]，返回相应字段的对象数组
// 主要运用于优化移动端大量数据下拉加载更多导致setData的数据很庞大
export const getProps = function (obj, props) {
  if(!isObject(props)) { throw new Error('参数有误，参数必须为object') }
  if(isArray(obj)) {
    return obj.map(item => {
      return Object.keys(props).reduce((prev, v) => {
        prev[v] = isObject(props[v]) ? getProps(item[v], props[v]) : item[v] || ''
        return prev
      }, {})
    })
  }else if(isObject(obj)) {
    return Object.keys(props).reduce((prev, item) => {
      prev[item] = isObject(props[item]) ? getProps(obj[item], props[item]) : obj[item] || ''
      return prev
    }, {})
  } else {
    return obj
  }
}
// 保证json格式数据的可靠获取。
// 举例子：const obj = { area: { city: null, cityName:'北京' }, areaName: '中国' }
// safeGet(() => obj.area.city.town, '') ---> ''
// 避免了这种写法： obj.area && obj.area.city && obj.area.city.town ? obj.area.city.town : ''
export const safeGet = function (run, defaultVal = '') {
  try {
    return run() || defaultVal
  } catch(e) {
    return defaultVal 
  } 
}

/*
**************金额操作********************
*/
/*
  * 参数说明：
  * n：要格式化的数字
  * type：float->小数形式。  intFloat->当整数的时候不需要带两个小数0，带小数时，保留几位小数
  * prev: 前置金额符号等等
  * prec：保留几位小数
  * dec：小数点符号
  * sep：千分位符号
  * 
  * 举例：formatMoney(12322.1223, 'float') ----- > "￥12,322.12"
  * 举例：formatMoney(12322.1223, 'float', '', 1) ------> "12,322.1"
  * 举例：formatMoney(12322, 'intFloat') ------> "12322"
*/
export const formatMoney = function (num = 0, type = 'float', prev = '￥', prec = 2, dec = '.', sep = ',') {
  num = String(num).replace(/[^0-9+-Ee.]/g, '') || '0'
  prec = Number(prec)
  if((type === 'intFloat' && !num.includes('.')) || num === '0') { return num }
  let [intStr = '', floatStr = ''] = round(num, prec).split(dec) // 分割出整数和小数部分
  let re = /(-?\d+)(\d{3})/ // 匹配整数部分每个三位数
  while (re.test(intStr)) {
    intStr = intStr.replace(re, "$1" + sep + "$2") // 整数部分三位数添加分隔符如','
  }
  floatStr += new Array(prec + 1).join('0')
  return `${prev}${intStr}${dec}${floatStr.slice(0, prec)}`
}
// 金额计算，四舍五入返回N位有效数字
export const round = function (num, prec = 0) {
  prec = Number(prec)
  prec < 0 && (prec = 0)
  const k = Math.pow(10, prec)
  return String(Math.round(Number(num) * k) / k)
}
// 上限为lower
export const range = function (num, min = null, max = null) {
  if(min !== null) {
    num = num < min ? min : num
  }
  if(max !== null) {
    num = num > max ? max : num
  }
  return num
}
/*
**************日期时间操作********************
*/
// 获取日期字符串。
// 举例：获取今天日期:getDateStr(0)--->20200904
// 明天日期用-分割：getDateStr(1, '-')--->2020-09-05
export const getDateStr = function (AddDayCount = 0, split = '') {
  const dt = new Date()
  dt.setDate(dt.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  return `0000${dt.getFullYear()}`.slice(-4) + split + `00${(dt.getMonth() + 1)}`.slice(-2) + split + `00${dt.getDate()}`.slice(-2)
}
// 获取传入日期是星期几, 不传默认是今天
export const getDay = function (date) {
  let day = date ? new Date(date).getDay() : new Date().getDay()
  return '星期' + "日一二三四五六"[day]
}
// 获取实时   年-月-周-日-时-分-秒
// 举例： socketTime('2020-03-05') ---> 返回的就是2020年3月5日的年月日数据
// socketTime() // 默认返回当天数据
export const socketTime = function (date = new Date()) {
  const dt = new Date(date)
  const year = String(dt.getFullYear())
  const _month = String(dt.getMonth() + 1)
  const month = addZero(_month, 2)
  const day = addZero(dt.getDate(), 2)
  const _day = String(dt.getDate())
  const weekDay = String(dt.getDay())
  const _weekDay = '星期' + "日一二三四五六"[weekDay]
  const hour = addZero(dt.getHours(), 2)
  const minutes = addZero(dt.getMinutes(), 2)
  const seconds = addZero(dt.getSeconds(), 2)
  return { year, month, _month, day, _day, weekDay, _weekDay, hour, minutes, seconds }
}
/**
 * @举例 dateFormater('YYYY-MM-DD HH:mm') ==> 2019-06-26 18:30
 * @举例 dateFormater('YYYYMMDD-hh:mm:ss', '2020-08-12 09:13:54') ==> 20200812-09:13:54
*/
export const dateFormater = function (formater, t){
  const date = t ? new Date(t) : new Date()
  const [Y, M, D, H, m, s] = [date.getFullYear() + '', date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2,2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
