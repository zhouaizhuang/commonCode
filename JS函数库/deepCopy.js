const mapTag = '[object Map]'
const setTag = '[object Set]'
// 将可遍历类型存在一个数组里
const canForArr = ['[object Map]', '[object Set]','[object Array]', '[object Object]']
// 将不可遍历类型存在一个数组
const noForArr = ['[object Symbol]', '[object RegExp]', '[object Function]']
// 不可遍历类型
const symbolTag = '[object Symbol]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'
// 判断类型的函数
export const checkType = function (target) {
  return Object.prototype.toString.call(target)
}
// 判断引用类型的temp
export const checkTemp = function (target) {
  const c = target.constructor
  return new c()
}
// 拷贝函数
export const cloneFunction = function (func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0]);
        }
    } else {
      return null;
    }
  } else {
    return eval(funcString)
  }
}
// 拷贝Symbol的方法
export const cloneSymbol = function (targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}
// 拷贝RegExp的方法
export const cloneReg = function (targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}
// 真正的深拷贝函数
export const deepClone = function (target, map = new Map()) {
  const type = checkType(target)  // 获取类型
  if (!canForArr.concat(noForArr).includes(type)) return target // 基本数据类型直接返回
  if (type === funcTag) return cloneFunction(target) // 判断Function，RegExp，Symbol
  if (type === regexpTag) return cloneReg(target)
  if (type === symbolTag) return cloneSymbol(target)
  const temp = checkTemp(target) // 引用数据类型特殊处理
  if (map.get(target)) { return map.get(target) } // 已存在则直接返回
  map.set(target, temp) // 不存在则第一次设置
  if (type === mapTag) { // 处理Map类型
    target.forEach((value, key) => temp.set(key, deepClone(value, map)))
    return temp
  }
  if (type === setTag) { // 处理Set类型
    target.forEach(value => temp.add(deepClone(value, map)))
    return temp
  }
  // 处理数据和对象
  for (const key in target) { temp[key] = deepClone(target[key], map) }
  return temp
}



// 测试
const a = {
  name: 'sunshine_lin',
  age: 23,
  hobbies: { sports: '篮球', tv: '雍正王朝' },
  works: ['2020', '2021'],
  map: new Map([['haha', 111], ['xixi', 222]]),
  set: new Set([1, 2, 3]),
  func: (name, age) => `${name}今年${age}岁啦！！！`,
  sym: Symbol(123),
  reg: new RegExp(/haha/g),
}
const b = Z.deepCopy(a)
console.log(b)
b.map.set('haha', 333)
console.log(a)