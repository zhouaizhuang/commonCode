/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
function sleep(delay) {
  return new Promise((_, reject) => {
    setTimeout(() => reject('超时喽'), delay)
  })
}
/**
 * 模拟请求
 */
function request() {
  return new Promise(resolve => {
    setTimeout(() => resolve('成功喽'), 1000)
  })
}
/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} delay 延迟时长
 * @returns {Promise<any>}
 */
function timeoutPromise(requestFn, delay) {
  return Promise.race([requestFn(), sleep(delay)])
}

/**
 * 模拟转盘旋转到停止的延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
 function turntableSleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve('停止转动喽'), delay)
  })
}
/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} turntableDelay 转盘转多久
 * @param {number} delay 请求超时时长
 * @returns {Promise<any>}
 */
function zhuanpanPromise(requsetFn, turntableDelay, delay) {
  return Promise.all([timeoutPromise(requsetFn, delay), turntableSleep(turntableDelay)])
}


// 测试：不超时，且先于转盘停止前请求回数据
zhuanpanPromise(request, 2500, 1500).then(res => console.log(res), err => console.log(err))