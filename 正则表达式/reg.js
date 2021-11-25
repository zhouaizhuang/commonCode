// https://juejin.cn/post/7016871226899431431
// 以下为正则校验，返回true or false
// 手机号码 18888175152
export const isPhone = val => /^1[3456789]\d{9}$/.test(val)
// 身份证 321281155121152489
export const isIdentity = val => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)
// 邮箱 '840043348@qq.com'
export const isEmail = val => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)
// url 'https://haha.sunshine.com/xxx/xxx'
export const isUrl = val => /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val)
// IPv4的校验 '122.12.56.65'
export const isIpv4 = val => /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)
// 16进制颜色的校验 '#1234567'
export const isColor16 = val => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(val)
// 日期的校验1 '2021-10-10'
export const isDate1 = val => /^\d{4}(\-)\d{1,2}\1\d{1,2}$/.test(val)
// 日期的校验2 '2021-10-10 16:16:16'
export const isDate2 = val => /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(val)
// 整数的校验 123
export const isInt = val => /^[-+]?\d*$/.test(val)
// 小数的校验 1234.5
export const isFloat = val => /^[-\+]?\d+(\.\d+)?$/.test(val)
// 保留n位小数 1234.555
export const checkFloat = n => new RegExp(`^([1-9]+[\d]*(.[0-9]{1,${n}})?)$`)
export const isResolve2 = val => checkFloat(2).test(val) // 保留两位小数
// 邮政编号的校验 522000'
export const isPostalNo = val => /^\d{6}$/.test(val)
// QQ号的校验 '1915801633'
export const isQq = val => /^[1-9][0-9]{4,10}$/.test(val)
// 微信号的校验  '厉害了我的vx'
export const isWxName = val => /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(val)
// 车牌号的校验 ''粤A12345''
export const isCarNo = val => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(val)
// 只含字母的字符串 'sunshineLin'
export const isLetter = val => /^[a-zA-Z]+$/.test(val)
// 包含中文的字符串  'sunshin张三eLin'
export const isIncludeZh_cn = val => /[\u4E00-\u9FA5]/.test(val)
// 密码强度的校验  密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符  
export const isPassword = val => /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/.test(val)
// 字符串长度n的校验  'sunshin张三eLin'
export const checkStrLength = n => new RegExp(`^.{${n}}$`)
export const isLen3 = val => checkStrLength(2).test(val) // 校验字符串长度为3
// 文件拓展名的校验
export const checkFileName = arr => {arr = arr.map(name => `.${name}`).join('|'); return new RegExp(`(${arr})$`)}
export const isFileName = val => checkFileName(['jpg', 'png', 'txt']).test(val) // 校验字符串长度为3