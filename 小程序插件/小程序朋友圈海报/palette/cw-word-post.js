
export default class CwWordPost {
  palette() {
    return ({
      width: '654rpx',
      height: '1000rpx',
      background: '#eee',
      views: [
        {
          type: 'image',
          url: 'https://upload.qianfanyun.com/cw_shareBg.png',
          css: {
            width: '654rpx',
            height: '1200rpx',
            top: '0rpx',
          },
        },
        
      ],
    });
  }
}

// const startTop = 50;
// const startLeft = 20;
// const gapSize = 70;
// const common = {
//   left: `${startLeft}rpx`,
//   fontSize: '40rpx',
// };

// function _textDecoration(decoration, index, color) {
//   return ({
//     type: 'text',
//     text: decoration,
//     css: [{
//       top: `${startTop + index * gapSize}rpx`,
//       color: color,
//       textDecoration: decoration,
//     }, common],
//   });
// }

// function _image(index, rotate, borderRadius) {
//   return (
//     {
//       id: `image-${index}`,
//       type: 'image',
//       url: '/palette/avatar.jpg',
//       css: {
//         top: `${startTop + 8.5 * gapSize}rpx`,
//         left: `${startLeft + 160 * index}rpx`,
//         width: '120rpx',
//         height: '120rpx',
//         shadow: '10rpx 10rpx 5rpx #888888',
//         rotate: rotate,
//         minWidth: '60rpx',
//         borderRadius: borderRadius,
//         scalable: true,
//       },
//     }
//   );
// }

// function _des(index, content) {
//   const des = {
//     type: 'text',
//     text: content,
//     css: {
//       fontSize: '22rpx',
//       top: `${startTop + 8.5 * gapSize + 140}rpx`,
//     },
//   };
//   if (index === 3) {
//     des.css.right = '60rpx';
//   } else {
//     des.css.left = `${startLeft + 120 * index + 30}rpx`;
//   }
//   return des;
// }
