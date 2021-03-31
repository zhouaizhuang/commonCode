
export default class ImageExample {
  palette() {
    return ({
      width: '654rpx',
      height: '1000rpx',
      background: '#eee',
      views: [
        {
          type: 'image',
          url: "https://upload.qianfanyun.com/cw_pic.png",
        },
        {
          type: 'text',
          text: '未设置height、width时123231',
          css: {
            right: '50rpx',
            top: '60rpx',
            fontSize: '30rpx',
          },
        },
        {
          type: 'image',
          url: 'https://upload.qianfanyun.com/cw_pic.png',
          css: {
            width: '200rpx',
            height: '200rpx',
            top: '230rpx',
          },
        },
        {
          type: 'text',
          text: "mode: 'aspectFill' 或 无",
          css: {
            left: '210rpx',
            fontSize: '30rpx',
            top: '290rpx',
          },
        },
        {
          type: 'image',
          url: 'https://upload.qianfanyun.com/cw_pic.png',
          css: {
            width: '200rpx',
            height: '200rpx',
            mode: 'scaleToFill',
            top: '500rpx',
          },
        },
        {
          type: 'text',
          text: "mode: 'scaleToFill'",
          css: {
            left: '210rpx',
            top: '560rpx',
            fontSize: '30rpx',
          },
        },
        {
          type: 'image',
          url: 'https://upload.qianfanyun.com/cw_pic.png',
          css: {
            width: '200rpx',
            height: 'auto',
            top: '750rpx',
          },
        },
        {
          type: 'text',
          text: '设置height为auto',
          css: {
            left: '210rpx',
            top: '780rpx',
            fontSize: '30rpx',
          },
        },
      ],
    });
  }
}
