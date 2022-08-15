// 备注：轻量级的表单校验库 https://github.com/validatorjs/validator.js
// 校验必填
const check = {
  isRequire: (val, msg) => val ? '' : msg, // 必填项是否填写了
  isPhone: (val, msg) => /^1[3456789]\d{9}$/.test(val) ? '' : msg, // 是否是合法的手机号码
  minLength: (val, len, msg) => val.length > len ? '' : msg, // 字符串最小长度
  maxLength: (val, len, msg) => val.length < len ? '' : msg, // 字符串最大长度
  isIdentity: (val, msg) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val) ? '' : msg, // 是否是合法的身份证
}
// 表单校验实例
export const Validator = function () {
  this.cache = [] // 保存校验规则
}
// 添加校验函数
Validator.prototype.add = function(val, rules) {
  Object.keys(rules).forEach(item => {
    this.cache.push(function (){
      let [func, ...arg] = item.split(':') // 用冒号传入一些限制参数，比如minLength:10:5 ----> 那么func===>minLength、...arg ===> 10, 5
      arg.push(rules[item]) // rules[item]是校验提示信息，msg作为最后一个参数传入
      return check[func](val, ...arg)
    })
  })
}
// 开始校验
Validator.prototype.start = function() {
  for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var msg = validatorFunc() // 开始校验，并取得校验后的返回信息
    if (msg) { return msg } // 如果有确切的返回值，说明校验没有通过
  }
  return ''
}
/**使用方法 */
import { Validator } from '/xxx/xxx/check.js'
function checkForm(){
  const [userName, password, phoneNumber] = ['123', 'asdsassaasd', '15388178152']
  var validator = new Validator() // 创建一个 validator 对象
  validator.add(userName, { "isRequire": "用户名不能为空", "minLength:5": "用户名长度不能少于5位" }) // 通过冒号进行额外参数的传递
  validator.add(password, { "minLength:6": "密码长度不能少于6位" })
  validator.add(phoneNumber, { "isPhone": "请输入正确的手机号码" })
  var errorMsg = validator.start() // 获得校验结果
  console.log(errorMsg)
  return errorMsg
}
checkForm()
