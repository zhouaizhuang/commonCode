/**
 * 1、有一串代码是这样的，根据状态，前端做出不同的提示，这是判断函数
 * 请优化这段代码。
 * 预期：优化到你认为合适的版本。
 */
// 原始代码
// function getMsg (state) {
//   let msg = ''
//   if(state === 0 || state === '0') {
//     msg = '活动已结束'
//   } else if(state === 1 || state === '1'){
//     msg = '活动尚未开始'
//   } else if(state === 2 || state === '2') {
//     msg = '活动参与人数已满'
//   } else if(state === 3 || state === '3') {
//     msg = '活动奖品已经发放'
//   } else if(state === 4 || state === '4') {
//     msg = '谢谢参与'
//   } else if(state === 5 || state === '5'){
//     msg = '您并没有报名'
//   }
//   return msg
// }

/****************这是拷贝的代码，在此处进行优化******************** */ 
function getMsg (state) {
  let msg = ''
  if(state === 0 || state === '0') {
    msg = '活动已结束'
  } else if(state === 1 || state === '1'){
    msg = '活动尚未开始'
  } else if(state === 2 || state === '2') {
    msg = '活动参与人数已满'
  } else if(state === 3 || state === '3') {
    msg = '活动奖品已经发放'
  } else if(state === 4 || state === '4') {
    msg = '谢谢参与'
  } else if(state === 5 || state === '5'){
    msg = '您并没有报名'
  }
  return msg
}



















// 初中级
function getMsg (state) {
  let msg = ''
  if(state == 0) {
    msg = '活动已结束'
  } else if(state == 1){
    msg = '活动尚未开始'
  } else if(state == 2) {
    msg = '活动参与人数已满'
  } else if(state == 3) {
    msg = '活动奖品已经发放'
  } else if(state == 4) {
    msg = '谢谢参与'
  } else if(state == 5){
    msg = '您并没有报名'
  }
  return msg
}
// 高级
// 版本一
// 评价：这个方法挺好，但是局限性就是必须保证以后state也必须是数字1或者能转成数字的字符串
function getMsg(state){
  return ['活动已结束', '活动尚未开始', '活动参与人数已满', '活动奖品已经发放', '谢谢参与', '您并没有报名'][state] || ''
}
// 版本二
// 评价：次方法，能保证字符串、非数字也能兼容
function getMsg (state) {
  const mapStr = {
    0: '活动已结束',
    1: '活动尚未开始',
    2: '活动参与人数已满',
    3: '活动奖品已经发放',
    4: '谢谢参与',
    5: '您并没有报名',
  }
  return mapStr[state] || ''
}