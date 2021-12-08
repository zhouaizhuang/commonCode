// import { post } from "../network/request"
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isQianFan = () => UA && UA.match(/QianFan/i) == "QianFan" // 是否是微信
export const isWeChat = () => UA && UA.match(/MicroMessenger/i) == "micromessenger" // 是否是微信
/**
 * H5业务函数
 */
/**
 * 初始化微信分享好友、分享朋友圈、跳转小程序
 * @举例 await wxInit() 
 * <div class="rel" style="width:4.02rem;height:3rem;border-radius:80px;margin: 0 auto;">
      <wx-open-launch-weapp
        id="launch-btn"
        :username="gh_id"
        :path="`plugin://Olympics-plugin/og-index?guess_id=${$route.query.guess_id}&invitees=${$route.query.need_help_player_id}&role=user`"
        style="position:absolute;top:0;left:0;z-index:100;width:100%;height:100%"
      >
        <script type="text/wxtag-template">
          <div style="width:100%;height:150px;background-color:pink;opacity:0;">
            去小程序中助力
          </div>
        </script>
      </wx-open-launch-weapp>
      <div class="abs l0 r0 t0" style="height:0.88rem;">
        <img src="https://upload.qianfanyun.com/olympic_btn_empty.png" class="w100 h100">
        <div class="abs l50 t50 txy-50 gf fs34r zx10 b nowrap">去小程序中助力</div>
      </div>
    </div>
 */
/**
 * 备注：这里必须上线调试看效果，jsApiList中声明需要用到的api。openTagList中声明需要用到的标签
 * 把debug开起来调试，线上调试。显示出ok就正常了
 * @returns 
 */
export const wxInit = async function() {
  let weChatInit = false
  const url = window.location.href.split('#')[0]
  // 这个地方需要读取数据！！！需要开发
  // const {appId, timestamp, nonceStr, signature} = await http.get('/index/share', {url}) // url要传给后端的
  return new Promise(function (resolve, reject) {
    if (!isWeChat() || weChatInit) { return resolve() }
    const obj = {
      debug: false, appId, timestamp, nonceStr, signature,
      url: encodeURIComponent(url),
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
      openTagList: ["wx-open-launch-weapp"] // 跳转小程序时必填。注意公众号必须是已经认证的服务号
    }
    wx.config(obj)
    wx.ready(() => { weChatInit = true; resolve(); })
    wx.error(() => reject())
  })
}
// 异步加载js
// 举例子：await loadJs("https://res.wx.qq.com/open/js/jweixin-1.6.0.js");
export const loadJs = async function(url) {
  let loadedJs = []
  return new Promise((resolve, reject) => {
    if (loadedJs.includes(url)) { resolve() }
    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = url
    script.onload = function () { loadedJs.push(url); resolve() }
    script.onerror = function () { reject() }
    document.head.appendChild(script)
  })
}
/**
 * 初始化微信分享好友、分享朋友圈、跳转小程序
 * @举例 setWxShare({title: '分享标题', imgUrl: 'https://www.wecasc.asd.png', desc: '分享描述'})
 */
export const setWxShare = async function({ title = '', imgUrl = '', desc = '', link = window.location.href } = {}) {
  if(isWeChat()) {
    await loadJs('https://res.wx.qq.com/open/js/jweixin-1.6.0.js') //加载微信js
    await wxInit() //微信初始化
    // 下面是分享好友和朋友圈
    wx.ready(function () { 
      // 分享朋友圈
      wx.updateTimelineShareData({ 
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {}
      })
      // 分享好友
      wx.updateAppMessageShareData({ 
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: () => {}
      })
    })
  } else if(isQianFan()){
    try {
      QFH5.setShareInfo(title, image, description, lineLink, function ( state, data) {
        if(state != 1) { alert(data.error) }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
