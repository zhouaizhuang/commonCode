// plugin/olympicGuess/_components/taskList.js
import { post, get } from "../../request"
import { go, JSON2url, safeGet, showToast } from "/common.js"
const guessCardText = "竞欧文洲杯猜足球赛事卡".replace(/欧文洲杯/g, '').replace(/足球赛事/g, '')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShowTask: {
      type: Boolean,
      value: false
    },
    guessId: {
      type: String,
      value: ''
    },
    taskData:{
      type: Object,
      value: {comment: {}, help: {}, like: {}, login:{}, service:{}}
    },
    redirect:{
      type: String,
      value: ''
    },
    qyWechat: {
      type: String,
      value: ''
    },
    redirectBackBg: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    taskList: [
      // {type:'login', img: 'https://upload.qianfanyun.com/og_login.png', btnImg: '', name: '每日登录App(0/1)', desc: `每日登录App，获得一张${guessCardText}`, bindtap: 'goApp'},
      {type:'invite',img: 'https://upload.qianfanyun.com/og_email.png', name: '邀请新活动用户(已邀请0人)', desc: `邀请一位新用户，获得三张${guessCardText}`, bindtap: ''},
      {type:'help',img: 'https://upload.qianfanyun.com/olympic_help_friend2.png', name: '好友助力(0/2)', desc: `邀请好友助力一次，获得一张${guessCardText}`, bindtap: ''},
      {type:'view_video',img: 'https://upload.qianfanyun.com/olympic_vedio.png', name: '点赞“鹏宇视频”看品质装修(0/1)', desc: `每日点赞鹏宇视频，获得一张${guessCardText}`, bindtap: 'goWatchVedio'},
      {type:'view_shop_one',img: 'https://upload.qianfanyun.com/og_renovation.png', name: '逛“鹏宇设计”看实景案例(0/1)', desc: `每日打开鹏宇设计，获得一张${guessCardText}`, bindtap: 'goPengYu'},
      {type:'view_cz_yx',img: 'https://upload.qianfanyun.com/og_cz_yx.png',btnImg:'https://upload.qianfanyun.com/og_task_go_finish.png', name: '抢“鹏宇大礼包”享惊喜折扣(0/1)', desc: `每日打开鹏宇礼包链接，获得两张${guessCardText}`, bindtap: 'go_cz_yx'},
      {type:'view_kl',img: 'https://upload.qianfanyun.com/og_renovation.png', name: '逛“咖乐防水”漏水包赔(0/1)', desc: `每日浏览咖乐防水帖子，获得一张${guessCardText}`, bindtap: 'gokaLe'},
      {type:'like',img: 'https://upload.qianfanyun.com/og_agree.png', name: '互动点赞(0/2)', desc: `成功点赞App社区帖，获得一张${guessCardText}`, bindtap: 'goApp'},
      {type:'comment',img: 'https://upload.qianfanyun.com/og_chat.png', name: '优质评论(0/2)', desc: `成功评论App社区帖，获得一张${guessCardText}`, bindtap: 'goApp'},
      {type:'service',img: 'https://upload.qianfanyun.com/og_customer.png', name: '添加福利客服(0/1)', desc: `成功添加微信客服，获得一张${guessCardText}`, bindtap: 'goContact'},
    ], // 任务列表
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchTask(){}, // 阻止时间冒泡
    preventdefault(){}, // 阻止滚动
    closeTask(){
      this.triggerEvent('closeTask')
    },
    async gokaLe(){
      this.closeTask()
      const {code, text} = await post(`/olympic/app/game/do-task?activity_id=${this.data.guessId}`, { type: 10 })
      if(code) { return showToast(text) }
      go('/pages/threadDetail/main?id=15626146', {
        redirect: this.data.redirect,
      })
    },
    goThreadDetail(){
      wx.switchTab({url: '/pages/home/main'})
    },
    // 跳转到鹏宇小程序
    // 常州鹏宇装饰有限公司（913204045691343291）
    // 帐号原始ID
    // gh_1162996caedd
    // AppID
    // wx62c24425683acff1
    async goPengYu(){
      this.closeTask()
      const {code, text} = await post(`/olympic/app/game/do-task?activity_id=${this.data.guessId}`, { type: 7 })
      if(code) { return showToast(text) }
      const url = JSON2url('/pages/jumpMini/main', {
        redirectBackBg: encodeURIComponent(this.data.redirectBackBg),
        redirect: this.data.redirect,
        appId: 'wx62c24425683acff1'
      })
      go(url)
    },
    goFunc(){
      // 进入新页面。等待设计中
    },
    // 浏览视频type是8
    async goWatchVedio(){
      const {code, data = {}, text} = await get(`/olympic/app/game/site-id?activity_id=${this.data.guessId}`)
      if(code) {return showToast(text)}
      return showToast(`请打开${data.site_name || ''}App完成`)
    },
    // 跳转到高灰设计小程序
    // async goGaohui(){
    //   this.closeTask()
    //   const {code, text} = await post(`/olympic/app/game/do-task?activity_id=${this.data.guessId}`, { type: 8 })
    //   if(code) {
    //     return showToast(text)
    //   }
    //   const url = JSON2url('/pages/jumpMini/main', {
    //     redirectBackBg: encodeURIComponent(this.data.redirectBackBg),
    //     redirect: this.data.redirect,
    //     appId: 'wx878398b3ed47e415'
    //   })
    //   go(url)
    // },
    async go_cz_yx(){
      this.closeTask()
      const {code, text} = await post(`/olympic/app/game/do-task?activity_id=${this.data.guessId}`, { type: 9 })
      if(code) { return showToast(text) }
      const url = JSON2url('/pages/jumpMini/main', {
        redirectBackBg: encodeURIComponent(this.data.redirectBackBg),
        redirect: this.data.redirect,
        appId: 'wx1397b983abbf569d', // 询问一下appid
        path: encodeURIComponent('/views/info/index?id=7494')
      })
      // console.log(url)
      go(url)
    },
    async goApp(){
      const {code, data, text} = await get(`/olympic/app/game/site-id?activity_id=${this.data.guessId}`)
      if(code) {return showToast(text)}
      return showToast(`请打开${data.site_name || ''}App完成`)
      // wx.switchTab({url: '/pages/home/main'})
      // const url = JSON2url(`/pages/chartPage/main?redirect=${this.data.redirect}`, {
      //   "sendMessageTitle": '点击下方链接', // 小卡片的标题
      //   "sendMessageImg": 'https://upload.qianfanyun.com/og_openApp1.png', // 小卡片的图片
      //   "showMessageCard":'true', // 是否显示小卡片
      //   "sendMessagePath": encodeURIComponent(`/pages/chartPage/main?guess_id=${this.data.guessId}`), // 小卡片路径
      //   "tipText": '点击下方链接', // 页面的提示文案
      //   "tipImg": "https://upload.qianfanyun.com/og_openApp1.png", // 页面提示的图片地址
      // })
      // go(url)
    },
    goContact(){
      wx.previewImage({
        current: 1,
        urls: [this.data.qyWechat],
        success: () => {
          this.triggerEvent('closeTask')
          post(`/olympic/app/game/do-task?activity_id=${this.data.guessId}`, {type: 6}).then(res => {
            const { code, text } = res
            if(code) {
              showToast(text)
            }
          })
        },
        fail: () => {}
      })
    }
  },
  observers: {
    'taskData': async function(taskData) {
      if(!taskData || JSON.stringify(taskData) === '{}') {
        return false
      }
      // delete taskData.view_shop_one
      // delete taskData.view_shop_two
      let newTaskList = this.data.taskList.map((item, index) => {
        let [now_count, total_count] = [0, 0]
        now_count = Number(safeGet(() => taskData[item.type].now_count, 0))
        total_count = Number(safeGet(() => taskData[item.type].total_count, 0))
        item.isShow = true
        if(item.type === 'invite') {
          item.name = item.name.slice(0, item.name.lastIndexOf('(')) + `(已邀请${safeGet(() => taskData.invite_new.now_count, 0)}人)`
        } else {
          item.name = item.name.slice(0, item.name.lastIndexOf('(')) + `(${now_count}/${total_count})`
        }
        if(item.type === 'view_shop_one') { // 鹏宇设计，这个有的站点不需要显示
          item.isShow = !!taskData.view_shop_one
        }
        if(item.type === 'view_video') { // 看视频任务，这个有的站点不需要显示
          item.isShow = !!taskData.view_video
        }
        if(item.type === 'view_cz_yx') { // 常州优选任务，这个有的站点不需要显示
          item.isShow = !!taskData.view_cz_yx
        }
        if(item.type === 'view_kl') { // 跳转咖乐防水帖子，这个有的站点不需要显示
          item.isShow = !!taskData.view_kl
        }
        const isFinish = total_count > 0 && now_count >= total_count
        item.sort = isFinish ? -1 : index
        item.btnImg = isFinish ? 'https://upload.qianfanyun.com/olympic_task_finish2.png' : 'https://upload.qianfanyun.com/olympic_task_gofinish2.png'
        if(item.type === 'service') {
          item.isShow = !isFinish
        }
        return item
      }).filter(item => item.isShow)
      newTaskList = [...newTaskList.filter(item => item.sort !== -1), ...newTaskList.filter(item => item.sort === -1)]
      this.setData({taskList: newTaskList})
    }
  }
})
