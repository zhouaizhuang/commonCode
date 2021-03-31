import { cwShareConfig } from "/global.js"
export default class CwPost {
  palette() {
    return ({
      width: '654rpx',
      height: '1100rpx',
      background: '#eee',
      views: [
        { // 背景
          type: 'image',
          url: 'https://upload.qianfanyun.com/cw_shareBg.png',
          css: {
            width: '654rpx',
            height: '1200rpx',
            top: '0rpx',
          },
        },
        { // 白色背景
          type: 'rect',
          css: {
            width: '600rpx',
            height: '850rpx',
            color: '#fff',
            left: '26rpx',
            top: '170rpx',
            borderRadius: '10rpx',
          },
        },
        { // 头像白色背景
          type: 'rect',
          css: {
            width: '102rpx',
            height: '300rpx',
            color: '#fff',
            left: '279rpx',
            top: '120rpx',
            borderRadius: '51rpx',
          },
        },
        { // 微信头像
          type: 'image',
          url: cwShareConfig.avatar,
          css: {
            width: '90rpx',
            height: '90rpx',
            left: '284rpx',
            top: '128rpx',
            borderRadius: '45rpx',
          },
        },
        { // 微信名称
          type: 'text',
          text: cwShareConfig.userName,
          css: {
            top: '230rpx',
            left: '326rpx',
            fontSize: '24rpx',
            width: '100rpx',
            textAlign: 'center',
            align: 'center',
            padding: '10rpx',
          },
        },
        { // 集字免费获得奖品背景
          type: 'rect',
          css: {
            width: '530rpx',
            height: '60rpx',
            color: '#FFE3D8',
            left: '60rpx',
            top: '270rpx',
            borderRadius: '45rpx',
          },
        },
        { // 集字免费获得奖品文字
          type: 'text',
          text: '“集福字免费获得奖品”',
          css: {
            top: '283rpx',
            left: '326rpx',
            fontSize: '28rpx',
            width: '530rpx',
            textAlign: 'center',
            align: 'center',
            padding: '10rpx',
            color: '#FF723C',
          },
        },
        { // 小程序分享图片
          type: 'image',
          url: cwShareConfig.xcx_share_pic,
          css: {
            width: '530rpx',
            height: '380rpx',
            left: '60rpx',
            top: '360rpx',
            borderRadius:'5rpx'
          }
        },
        ...renderText(cwShareConfig.title, 760, 60),
        { // 礼物图标
          type: 'image',
          url: "https://upload.qianfanyun.com/cw_smallGift.png",
          css: {
            width: '30rpx',
            height: '30rpx',
            left: '60rpx',
            top: '900rpx',
          },
        },
        { // 集字免费获得奖品文字
          type: 'text',
          text: `奖品还剩${cwShareConfig.left}份，快来参与吧`,
          css: {
            top: '904rpx',
            left: '110rpx',
            fontSize: '24rpx',
            width: '700rpx',
            padding: '10rpx',
            color: '#FF723C',
          }
        },
        { // 点击识别二维码
          type: 'image',
          url: "https://upload.qianfanyun.com/cw_joinApplet.png",
          css: {
            width: '350rpx',
            height: '45rpx',
            left: '60rpx',
            top: '945rpx',
            borderRadius: '0 30rpx 30rpx 30rpx', 
          },
        },
        { // 小程序二维码
          type: 'image',
          url: cwShareConfig.app_code,
          css: {
            width: '120rpx',
            height: '120rpx',
            right: '60rpx',
            top: '880rpx',
          },
        },
      ],
    });
  }
}

function renderText(title, topStart = 0, left = 0){
  const lineNum = 18
  const titleArr = title.split('').reduce((prev, item, index) => {
    const idx = Math.floor(index / lineNum)
    if(!prev[idx]) {
      prev[idx] = item
    } else {
      prev[idx] += item
    }
    return prev
  }, [])
  return titleArr.map((item, index) => {
    return { // 集字免费获得奖品文字
      type: 'text',
      text: item,
      css: {
        top: `${topStart + index * 50}rpx`,
        left: `${left}rpx`,
        fontSize: '32rpx',
        width: '700rpx',
        padding: '10rpx',
        color: '#333',
        fontWeight:'bold'
      }
    }
  })
}