/********************************************************************* */
/********************************************************************* */
/******************1、简单需求。计算周几************************************ */
/********************************************************************* */
/********************************************************************* */
export const calcDays = function (){
  const dt = new Date()
  const nums = dt.getDay()
  if(nums === 0) {
    return '周日'
  } else if(nums === 1){
    return '周一'
  } else if(nums === 2){
    return '周二'
  } else if(nums === 3){
    return '周三'
  } else if(nums === 4){
    return '周四'
  } else if(nums === 5){
    return '周五'
  } else if(nums === 6){
    return '周六'
  }
}
// ------> 优化
export const calcDays1 = function (){
  const dt = new Date()
  const nums = String(dt.getDay())
  return '周' + ['日', '一', '二', '三', '四', '五', '六'][nums]
}
// ------> 进一步优化
export const calcDays2 = function (){
  const dt = new Date()
  const nums = dt.getDay()
  return `周${'日一二三四五六'[nums]}`
}

/********************************************************************* */
/********************************************************************* */
/******************2、简单需求：根据不同的状态跳转到不同的页面************ */
/********************************************************************* */
/********************************************************************* */
export const onButtonClick = status =>{
  if(status == 1){
    jumpTo('IndexPage')
  }else if(status == 2){
    jumpTo('FailPage')
  }else if(status == 3){
    jumpTo('FailPage')
  }else if(status == 4){
    jumpTo('SuccessPage')
  }else if(status == 5){
    jumpTo('CancelPage')
  }else {
    jumpTo('Index')
  }
}
// ============> 第一步优化
export const onButtonClick1 = status =>{
  const mapPath = {
    1: 'IndexPage',
    2: 'FailPage',
    3: 'FailPage',
    4: 'SuccessPage',
    5: 'CancelPage',
    'default': 'Index',
  }
  const path = mapPath[status] || mapPath['default']
  jumpTo(path)
}

/********************************************************************* */
/********************************************************************* */
/******************3、需求更加复杂，不仅仅需要跳转、还要发消息************ */
/********************************************************************* */
/********************************************************************* */
export const onButtonClick2 = status =>{
  if(status == 1){
    sendLog('processing')
    jumpTo('IndexPage')
  }else if(status == 2){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 3){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 4){
    sendLog('success')
    jumpTo('SuccessPage')
  }else if(status == 5){
    sendLog('cancel')
    jumpTo('CancelPage')
  }else {
    sendLog('other')
    jumpTo('Index')
  }
}
//-------->代码优化
const onButtonClick3 = (status)=>{
  const actions = {
    '1': ['processing','IndexPage'],
    '2': ['fail','FailPage'],
    '3': ['fail','FailPage'],
    '4': ['success','SuccessPage'],
    '5': ['cancel','CancelPage'],
    'default': ['other','Index'],
  }
  const  [logName, pageName] = actions[status] || actions['default']
  sendLog(logName)
  jumpTo(pageName)
}

/********************************************************************* */
/********************************************************************* */
/************4、下面需求变得进一步复杂了，有if嵌套*********************** */
/********************************************************************* */
/********************************************************************* */
export const onButtonClick4 = (status,identity)=>{
  if(identity == 'guest'){
    if(status == 1){
      //do sth
    }else if(status == 2){
      //do sth
    }else if(status == 3){
      //do sth
    }else if(status == 4){
      //do sth
    }else if(status == 5){
      //do sth
    }else {
      //do sth
    }
  }else if(identity == 'master') {
    if(status == 1){
      //do sth
    }else if(status == 2){
      //do sth
    }else if(status == 3){
      //do sth
    }else if(status == 4){
      //do sth
    }else if(status == 5){
      //do sth
    }else {
      //do sth
    }
  }
}
// -------->代码进一步优化
export const onButtonClick5 = (status,identity)=>{
  const actions = new Map([
    ['guest_1', () => {/**do sth */} ],
    ['guest_2', () => {/**do sth */} ],
    ['guest_3', () => {/**do sth */} ],
    ['guest_4', () => {/**do sth */} ],
    ['master_1', () => {/**do sth */} ],
    ['master_2', () => {/**do sth */} ],
    ['master_3', () => {/**do sth */} ],
    ['master_4', () => {/**do sth */} ],
    ['master_5', () => {/**do sth */} ],
    ['default', () => {/**do sth */} ],
  ])
  const fn = actions.get(`${identity}_${status}`) || actions.get('default')
  fn.call(this)
}
// ------> 再此基础上进一步优化
export const onButtonClick6 = (status,identity)=>{
  const actions = new Map([
    [{identity: 'guest', status: 1}, () => {/*function A*/}],
    [{identity: 'guest', status: 2}, () => {/*function A*/}],
    [{identity: 'guest', status: 3}, () => {/*function A*/}],
    [{identity: 'guest', status: 4}, () => {/*function A*/}],
    [{identity: 'guest', status: 5}, () => {/*function A*/}],
    [{identity: 'master', status: 1}, () => {/*function A*/}],
    [{identity: 'master', status: 2}, () => {/*function A*/}],
    [{identity: 'master', status: 3}, () => {/*function A*/}],
    [{identity: 'master', status: 4}, () => {/*function A*/}],
    [{identity: 'master', status: 5}, () => {/*function A*/}],
  ])
  let targetArr = [...actions].filter(([key, value]) => key.identity === identity && key.status === status)
  targetArr.forEach(([key, val]) => val.call(this))
}
// ------> 再此基础上进一步优化
export const onButtonClick7 = (status, identity)=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}
  const actions = new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    [/^guest_.*$/,functionC],
    //... 
  ])
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}