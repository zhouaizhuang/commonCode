<template>
  <div
    :class="['fixed trbl0 trans3', isShowTask ? 'op10 zx40' : 'op0 zx-1']"
    style="backgroundColor:rgba(0,0,0,.7);"
    @click="closeTask"
  >
    <div class='taskBg abs b0 w100 trans3 zx10' :style="{transform: isShowTask ? 'translateY(0)' : 'translateY(120%)', height: (taskList.filter(v => v.isShow).length * 140) / 100 + 'rem', maxHeight: '76vh'}" @click.stop="">
      <img src="https://upload.qianfanyun.com/olympic_red_top.png" class="abs tx-50" style="left:50%;top:-1.2rem;width:4.46rem;height:1.73rem;" />
      <img src="https://upload.qianfanyun.com/og_close_x.png" class="abs" style="right:0.5rem;top: -1.35rem;width:0.7rem;height:0.7rem;" @click="closeTask" />
      <img src="https://upload.qianfanyun.com/og_tasktitle_3.png" class="abs l50 tx-50 zx20" style="width:4.14rem;height:0.97rem;top:-0.3rem;" />
      <div class="abs trbl0 ovya" style="padding: 0.5rem 0.25rem 0.2rem;top: 0.22rem;">
        <div v-for="(item, index) in taskList.filter(v => v.isShow)" :key="index">
          <a v-if="item.link" class="tdn" :href="item.link">
            <div class="bgf rds15r pt20r pb20r pl15r pr5r f ac mb16r">
              <img :src="item.img" class="mr18r" style="width: 0.7rem;height:0.7rem;" />
              <div class="f1 f rw ac">
                <div class="w100 g2 b fs30r mb5">{{item.name}}</div>
                <div class="w100 g2 fs24r op9">{{item.desc}}</div>
              </div>
              <img :src="item.btnImg" style="width:1.54rem;height:0.75rem;" @click="() => buttonMethods(item.events)" />
            </div>
          </a>
          <div v-else class="bgf rds15r pt20r pb20r pl15r pr5r f ac mb16r">
            <img :src="item.img" class="mr18r" style="width:0.7rem;height:0.7rem;" />
            <div class="f1 f rw ac">
              <div class="w100 g2 b fs28r mb5 nowrap">{{item.name}}</div>
              <div class="w100 g2 fs24r op9">{{item.desc}}</div>
            </div>
            <img :src="item.btnImg" style="width:1.54rem;height:0.75rem;" @click="() => buttonMethods(item.events)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { goApplet } from '@/utils/util.js'
import { safeGet } from "@/common.js"
import olympic from '@/api/olympic.js'
import { isApp } from '@/utils/util.js'
export default {
  props: {
    isShowTask: {
      type: Boolean,
      value: true
    },
    guess_id:{
      type: String,
      value: ''
    },
    isInTime: { // 是否在活动期间。只有在首页需要做这个
      type: Boolean,
      value: false
    }
  },
  data(){
    return {
      taskList: [
        {type:'invite',img: 'https://upload.qianfanyun.com/og_email.png', name: '邀请新活动用户(已邀请0人)', desc: `邀请一位新用户，获得三张竞猜卡`, events: 'share', link: '', isShow:true},
        {type:'view_video',img: 'https://upload.qianfanyun.com/olympic_vedio.png', name: '点赞“鹏宇视频”看品质装修(0/1)', desc: `每日点赞鹏宇视频，获得一张竞猜卡`, events: 'goVedio', isShow:true},
        {type:'help',img: 'https://upload.qianfanyun.com/olympic_help_friend2.png', name: '好友助力(0/2)', desc: `邀请好友助力一次，获得一张竞猜卡`, events: 'share', link: '', isShow: true},
        {type:'view_shop_one',img: 'https://upload.qianfanyun.com/og_renovation.png', name: '逛“鹏宇设计”看实景案例(0/1)', desc: `每日打开鹏宇设计，获得一张`, events: 'goPengYu', link: '', isShow: false},
        {type:'view_cz_yx',img: 'https://upload.qianfanyun.com/og_cz_yx.png', name: '抢“鹏宇大礼包”享惊喜折扣(0/1)', desc: `每日打开鹏宇礼包链接，获得两张竞猜卡`, events: 'go_cz_yx', link: '', isShow: false},
        {type:'view_kl',img: 'https://upload.qianfanyun.com/og_renovation.png', name: '逛“咖乐防水”漏水包赔(0/1)', desc: `每日浏览咖乐防水帖子，获得一张竞猜卡`, events: 'goKaLe', link: 'hualongxiang://thread/?tid=15626146&replyid=0', isShow: false},
        {type:'like',img: 'https://upload.qianfanyun.com/og_agree.png', name: '互动点赞(0/2)', desc: `成功点赞社区帖，获得一张竞猜卡`, events: '', link: 'hualongxiang://forum?forumname=社区', isShow: true},
        {type:'comment',img: 'https://upload.qianfanyun.com/og_chat.png', name: '优质评论(0/2)', desc: `成功评论社区帖，获得一张竞猜卡`, events: '', link: 'hualongxiang://forum?forumname=社区', isShow: true},
        {type:'service',img: 'https://upload.qianfanyun.com/og_customer.png', name: '添加福利客服(0/1)', desc: `成功添加微信客服，获得一张竞猜卡`, events: 'goIndex', link:'', isShow: true},
      ], // 任务列表
    }
  },
  methods: {
    async goIndex(guess_id){
      const {code, data, text} = await olympic.getGhId(guess_id)
      if(code) { return this.$toast(text) }
      const { gh_id } = data
      let wxpath = `plugin://Olympics-plugin/og-index?role=user&guess_id=${guess_id}&addCustomer=1`
      await olympic.doTask(guess_id, 6)
      goApplet(wxpath, gh_id)
    },
    closeTask(){
      this.$emit('closeTask')
    },
    async goVedio(guess_id){
      const {code, text} = await olympic.doTask(guess_id, 8)
      if(code) { return this.$toast(text) }
      QFH5.openSmallVideo(1,1,15625604, 4171013, function(state, data){})
    },
    async goPengYu(guess_id){
      const {code, text} = await olympic.doTask(guess_id, 7)
      if(code) { return this.$toast(text) }
      goApplet('/pages/index/index', 'gh_1162996caedd')
    },
    async go_cz_yx(guess_id){
      const {code, text} = await olympic.doTask(guess_id, 9)
      if(code) { return this.$toast(text) }
      // goApplet('', 'gh_7e39ee4bd065')
      // app中需要直接跳转至H5
      window.location.href = 'https://www.lcch777.com/Home/Act/act_info/fid/7494.html'
    },
    async goKaLe(guess_id){
      const {code, text} = await olympic.doTask(guess_id, 10)
      if(code) { return this.$toast(text) }
    },
    share(){
      this.$emit('setShareModal', true)
    },
    async getCard(){
      const {code, text} = await olympic.getCard(this.guess_id)
      if(code) { return this.$toast(text) }
    },
    async getTaskData(){
      const { code, data, text } = await olympic.getTaskData({activity_id: this.guess_id })
      // delete data.view_shop_one
      // delete data.view_shop_two
      // delete data.view_cz_yx
      // delete data.view_kl
      if(code) { return this.$toast(text) }
      let newTaskList = this.taskList.map((item, index) => {
        let [now_count, total_count] = [0, 0]
        now_count = Number(safeGet(() => data[item.type].now_count, 0))
        total_count = Number(safeGet(() => data[item.type].total_count, 0))
        if(item.type === 'invite') {
          item.name = item.name.slice(0, item.name.lastIndexOf('(')) + `(已邀请${safeGet(() => data.invite_new.now_count, 0)}人)`
        } else {
          item.name = item.name.slice(0, item.name.lastIndexOf('(')) + `(${now_count}/${total_count})`
        }
        if(item.type === 'view_shop_one') { // 这个有的站点不需要显示
          item.isShow = !!data.view_shop_one
        }
        if(item.type === 'view_cz_yx') { // 这个有的站点不需要显示
          item.isShow = !!data.view_cz_yx
        }
        if(item.type === 'view_video') { // 看视频任务，这个有的站点不需要显示
          item.isShow = !!data.view_video
        }
        if(item.type === 'view_kl') { // 跳转咖乐防水帖子，这个有的站点不需要显示
          item.isShow = !!data.view_kl
        }
        if(item.type === 'like') {
          item.link = data.like ? data.like.url  : ''
        }
        if(item.type === 'comment') {
          item.link = data.comment ? data.comment.url  : ''
        }
        const isFinish = total_count > 0 && now_count >= total_count
        item.sort = isFinish ? -1 : index
        item.btnImg = isFinish ? 'https://upload.qianfanyun.com/olympic_task_finish2.png' : 'https://upload.qianfanyun.com/olympic_task_gofinish2.png'
        if(item.type === 'service') {
          item.isShow = !isFinish
        }
        return item
      }).filter(item => item.isShow)
      this.taskList = [...newTaskList.filter(item => item.sort !== -1), ...newTaskList.filter(item => item.sort === -1)]
    },
    // addCustomer(){
    //   const url = JSON2url(`/pages/chartPage/main`, {
    //     "sendMessageTitle": '获取竞猜卡', // 小卡片的标题
    //     "sendMessageImg": 'https://upload.qianfanyun.com/og_cus_getCard.png', // 小卡片的图片
    //     "showMessageCard":'true', // 是否显示小卡片
    //     "sendMessagePath": '/pages/chartPage/main', // 小卡片路径
    //     "tipText": '获取竞猜卡', // 页面的提示文案
    //     "tipImg": "https://upload.qianfanyun.com/og_cus_getCard.png", // 页面提示的图片地址
    //   })
    //   goApplet(url)
    // },
    buttonMethods(funcName){
      this.$emit('closeTask')
      if(funcName) {
        this.$options.methods[funcName].call(this, this.guess_id)
      }
    }
  },
  async created(){
    const {code, text} = await olympic.login(this.$route.params.id, {type: 1})
    if(code) { return this.$toast(text) }
    this.getTaskData()
  },
  watch: {
    isShowTask: async function (newVal, oldVal){
      if(newVal) {
        if(isApp()) {
          // 调用这个是为了将点赞数据同步
          await this.getCard()
          this.getTaskData()
        }
      }
    },
    isInTime: async function (newVal){
      if(newVal) {
        // 调用这个是为了将点赞数据同步
        await this.getCard()
        // 调用这个是为了获取是否已经登陆过
        const { code, data, text } = await olympic.getTaskData({activity_id: this.guess_id })
        if(code) { return this.$toast(text) }
        // 之前没有登录的话， 直接显示出每日登录获卡
        let isShowGetCard = safeGet(() => data.login.now_count != data.login.total_count, false)
        if(isShowGetCard) {
          this.$emit('setIsShowCard', true)
          await olympic.dayLoginGetCard(this.guess_id)
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style>
.taskBg{
  background: url('https://upload.qianfanyun.com/olympic_task_bg.png') no-repeat;
  background-size: 100% 100%;
  background-position: left top;
}
</style>