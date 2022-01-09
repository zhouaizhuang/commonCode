/***********************跳转小程序************************** */
/**
 * 千帆环境跳转小程序
 * @举例 goApplet('/pages/index/index', 'gh_5dedcbfae4e8') 
 */
 export const goApplet = function(wxpath, wxid = 'gh_5dedcbfae4e8') {
  QFH5.jumpMiniProgram(wxid, wxpath, function (state, data) {
    if (state == 1) {
      // alert('跳转成功')
      console.log('跳转成功')
    }
  })
}
/**
 * H5跳转小程序
 * @param {String} appletUrl 小程序页面路径
 * @param {String} ghId 小程序原始id
 * @param {String} dlUrl 小程序URL Scheme。在小程序后台工具那儿设置。根据复制app.json中配置的路径
 * @param {String} appletUrl 小程序页面路径
 * @param {String} url 公众号路径
 */
 export const goAppletPage = function ({appletUrl = '', ghId = '', dlUrl = '', url = '' } = {}){
  if(isQianFan()){
    goApplet(appletUrl, ghId)
  } else if(client.is_weixin()){
    window.location.href = dlUrl
  } else {
    window.location.href = url
  }
}

/*************************************************** */