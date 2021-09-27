/* 小程序公用js代码 */
import { isError, isObject } from './func.js'
/*
**************小程序api操作********************
*/
const app = getApp()
// 上报错误到小程序后台
const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
const username = wx.getStorageSync('username')
const phone = wx.getStorageSync('phone')
export const reportError = function (err) {
  if (!log) {return}
  let errStr = err
  if(isError(err)) {
    const {message, stack } = err
    errStr = stack ? String(stack) : String(message)
    errStr = errStr || String(err)
  } else if(isObject(err)) {
    errStr = JSON.stringify(err)
  }
  log.error.call(log, `${username}-${phone}-${errStr}`)
}
export const reportInfo = function (info) {
  if (!log) {return}
  let errStr = info
  if(isError(info)) {
    const {message, stack } = info
    errStr = stack ? String(stack) : String(message)
    errStr = errStr || String(info)
  } else if(isObject(info)) {
    errStr = JSON.stringify(info)
  }
  log.info.call(log, `${username}-${phone}-${errStr}`)
}
/*
 * 二次封装wx.request()
 * url:请求的接口地址
 * options:{method:请求方式, data: 请求传参, header: 请求头信息}
 */
export const get = function (url, params){
  return request(url, { data: params })
}
export const post = function (url, params){
  return request(url, { method: 'POST', data: params })
}
export function request (url, options = {}) {
  const site = wx.getStorageSync('site')
  let host
  const data = formatJSON(options.data)
  delete options.data
  const newOptions = {
    method: 'GET',
    data,
    header: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }, // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
    ...options
  }
  newOptions.method = newOptions.method.toUpperCase()
  if(newOptions.method === 'POST') {
    url = url.includes('?') ? url + '&' : url + '?'
    url += `token=${app.globalData.token}`
  } else {
    newOptions.data.token = app.globalData.token
  }
  if(newOptions.method === 'POST') {
    url = url.includes("token") ? `${url}&site=${site}&device=xcx` : `${url}?site=${site}&device=xcx`
  } else {
    newOptions.data.site = site
    newOptions.data.device = 'xcx'
  }
  if(app.globalData.root) {
    host = HOST['SH']
  } else {
    host = ENV === 'production' ? HOST['KH'] : HOST['CS']
  }
  url.includes('api/log/save') && wxLog.warn(`签到签退接口：${url}, 参数：${JSON.stringify(options.data)}`)
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      ...newOptions,
      success: res => {
        const { code, token } = res.data 
        if (code === 401) {
          app.toLogin()
        } else if(res.statusCode >= 400 && res.statusCode <= 600) {
          reportError(`请求失败!url:${host + url}<==>statusCode:${res.statusCode}<==>data:${JSON.stringify(res.data)}`)
          reportError(JSON.stringify(res.data))
          throw new Error(JSON.stringify(res.data))
        } else {
          const oldToken = wx.getStorageSync('token')
          if (token !== oldToken && code) {
            app.globalData.token = token
            wx.setStorageSync('token', token)
          }
          resolve(res)
          url.includes('api/log/save') && wxLog.warn(`签到签退请求发起成功, 返回data: ${JSON.stringify(res.data)}`)
          url.includes('api/log/log-detail') && wxLog.warn(`获取上次签到请求发起成功, 返回data: ${JSON.stringify(res.data)}`)
        }
      },
      fail: err => {   //请求失败
        // log('请求失败 (>_<)')
        reject(err)
      },
      complete: () => {
        // complete
      }
    })
  })
}
// 显示loading
export const showLoading = function (title = '加载中', duration = 0, mask = true) {
  wx.showLoading({ title, mask})
  if(duration) {
    hideLoading(duration)
  }
}
// 关闭loading
export const hideLoading = function (time = 0) {
  setTimeout(() => { wx.hideLoading() }, time)
}
// 显示提示弹框
export const showToast = (title, delay = 0, duration = 3000, icon='none') => {
  if(title) {
    setTimeout(() => {
      wx.showToast({ title: String(title), icon, duration})
      setTimeout(() => wx.hideToast(),duration)
    }, delay)
  }
}
// 页面跳转
export const go = function (url = '', time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateTo({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 返回页面栈前面N页, 延时time毫秒执行, 返回promise对象
export const goBack = function (delta = 1, time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateBack({
        delta,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 设置当前页面的标题
export const setPageTitle = function (title = '') {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title,
      success: res => { resolve(res) },
      fail: err => { reject(err) }
    })
  })
}

/**
 * tabBar跳转
 */
export const bindDeskTop = function () {
  wx.redirectTo({url: '/pages/index/index?isShowTabBar=1'}) 
}
export const bindChartCenter = function () {
  wx.redirectTo({url: '/pages/chart-center/index'}) 
}