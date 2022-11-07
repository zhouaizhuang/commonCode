// rem适配版本一
// (function (doc, win) {
//   const docEl = doc.documentElement
//   const metaEl = doc.querySelector('meta[name="viewport"]')
//   const dpr = win.devicePixelRatio || 1
//   let rem = 100 * (docEl.clientWidth * dpr / 750) // 这样子的话，就需要我们使用的值和设计稿物理像素一致
//   rem > 200 && (rem = 200)
//   var scale = 1 / dpr
//   // 设置viewport，进行缩放，达到高清效果
//   metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no')
//   docEl.setAttribute('data-dpr', dpr) // 设置data-dpr属性，留作的css hack之用，解决图片模糊问题和1px细线问题
//   docEl.style.fontSize = rem + 'px' // 动态写入样式
// })(document, window)


// rem适配版本二
// (function () {
//   var irate = 625;
//   var iw = 750;
//   var win = window;
//   var w = document.documentElement.clientWidth;
//   var doc = document;
//   var irate = 625 / (iw / w);
//   irate = Math.min(irate, 625);
//   doc.documentElement.style.fontSize = irate * 0.16 + "px";
//   //华为手机修正
//   var root = window.document.documentElement;
//   var fontSize = parseFloat(root.style.fontSize);
//   var finalFontSize = parseFloat(
//     window.getComputedStyle(root).getPropertyValue("font-size")
//   );
//   if (finalFontSize !== fontSize) {
//     root.style.fontSize = fontSize + (fontSize - finalFontSize) + "px";
//   }
// })()



/***** rem适配版本三******/
// 第一个参数是设计稿尺寸。UI给出的设计稿是750那么前面就设置为750. 第二个参数是实际真机的最大支持尺寸。也就是宽度750时基准rem已经最大
(function (designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    var rem = width * 100 / designWidth;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();
  win.addEventListener("resize", function () {
    clearTimeout(tid); //防止执行两次
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener("pageshow", function (e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);
  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }
})(750, 750);


/**检查浏览器是否是手机微信浏览器 */
(function (){
  var useragent = navigator.userAgent
  if (!useragent.match(/MicroMessenger/i) || !(navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！')
  }
})()


// 移动端真机调试核心代码
// 1、安装  cnpm install vconsole
// 然后在main.js中执行
import VConsole from 'vconsole'
let showVConsoleTimer = null
document.addEventListener('touchstart', function () {
  clearTimeout(showVConsoleTimer)
  showVConsoleTimer = setTimeout(() => {
    const vConsole = new VConsole()
  }, 8000)
})
document.addEventListener('touchend', function () {
  clearTimeout(showVConsoleTimer)
})



// 微信数字签名验证工具： https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign
let wxInited = false
async function wxInit () {
  return new Promise(function (resolve, reject) {
    if (!client.is_weixin() || wxInited) {
      resolve();
      return;
    }
    let siteConfig = window.vueRoot.siteConfig;
    const url = window.location.href.split('#')[0]
    const obj = {
      debug: true,
      appId: siteConfig.wxJssdk["appId"],
      timestamp: siteConfig.wxJssdk["timestamp"],
      nonceStr: siteConfig.wxJssdk["nonceStr"],
      signature: siteConfig.wxJssdk["signature"],
      url: encodeURIComponent(url),
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
    }
    wx.config(obj)
    wx.ready(function () {
      wxInited = true;
      resolve();
    });
  });
}

//设置微信分享
export async function setWxShare (dt) {
  if (!client.is_weixin() && !client.is_qianfan() && !client.is_mocuz()) return;
  var title = dt.title;
  var image = dt.image;
  let siteConfig = window.vueRoot.siteConfig;
  if (!image && siteConfig) image = siteConfig.siteWeixinLogo;
  image = image.replace("imageslim|", "");
  var description = dt.description;
  var lineLink = window.location.href;
  if (client.is_weixin()) {
    //加载微信js
    await client.loadWeixinJs();
    //微信初始化
    await wxInit();
    // 分享朋友圈
    wx.ready(function () { 
      wx.updateTimelineShareData({ 
        title, // 分享标题
        desc: description, // 分享描述
        link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: image, // 分享图标
        success: function () {
          // 设置成功
        }
      })
      // 分享好友
      wx.updateAppMessageShareData({ 
        title: title, // 分享标题
        desc: description, // 分享描述
        link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: image, // 分享图标
        success: function () {
          // 设置成功
        }
      })
    })
  } else if (client.is_qianfan()) {
    if (!QFH5) await request.wait(500);
    try {
      QFH5.setShareInfo(title, image, description, lineLink, function (
        state,
        data
      ) {
        if (state != 1) {
          alert(data.error);
        }
      });
    } catch (e) { }
  } else if (client.is_mocuz()) {
    MOJS.showShareButton(title, description, lineLink, image);
  }
}