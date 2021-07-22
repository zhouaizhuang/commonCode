<template>
  <!--https://blog.csdn.net/weixin_39228870/article/details/108218844-->
  <div class="bgf7 container ovya" style="height:100vh">
    <div class="share-card card">
      <img :src="detail.share_img" class="share-card-img">
      <div class="share-card-title">{{detail.share_title}}</div>
      <div class="share-card-my">
        <img :src="need_help_player_head_img" class="my-avatar">
        <div class="my-info">
          <div class="my-name">{{need_help_player_name}}</div>
          <div class="my-text">邀请您帮忙助力</div>
        </div>
      </div>
      <div class="share-card-notice">
        <div class="notice-text">帮忙助力，您也可以获得抽卡机会哦！</div>
        <div class="notice-fire">
          <img :src="require('@/assets/imgs/icon-fire.png')" alt="">
          <span class="notice-fire-red">{{detail.playerNum}}</span>
          <span>人已参加活动</span>
        </div>
      </div>
    </div>
    <!--必须线上才能看到效果-->
    <div class="rel" style="width:4.02rem;height:3rem;border-radius:80px;margin: 0 auto;">
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
  </div>
</template>
<script>
import olympic from '@/api/olympic.js'
export default {
  name: 'guessShare',
  data() {
    return {
      query: {},
      detail: {},
      need_help_player_name: '',
      need_help_player_head_img: '',
      gh_id: '', // 小程序原始id
    }
  },
  methods: {
    async getGameInfo(){
      const {code, data, text} = await olympic.getGameInfo(this.$route.query.guess_id)
      if(code) { return this.$toast(text) }
      let { detail = {} } = data
      const {base_player, player} = detail
      detail.playerNum = Number(base_player) + Number(player) > 0 ? Number(base_player) + Number(player) : 0
      this.detail = detail
      window.document.title = detail.title
    },
    async getUserInfo(){
      const {code, data, text} = await olympic.getPlayerInfo(this.$route.query.need_help_player_id, this.$route.query.guess_id)
      if(code) { return this.$toast(text) }
      const {user_name, avatar} = data
      this.need_help_player_name = user_name
      this.need_help_player_head_img = avatar
    }
  },
  async created() {
    this.getGameInfo() // 获取活动信息。分享信息
    this.getUserInfo() // 获取玩家信息
    const {data: {gh_id}} = await olympic.getGhId(this.$route.query.guess_id)
    this.gh_id = gh_id
    const url = window.location.href.split('#')[0]
    const {code, data, text} = await olympic.gameJsConfig(url, this.$route.query.guess_id)
    if(code) { return this.$toast(text)}
    const {appId, timestamp, nonceStr, signature} = data
    const obj = {
      debug: false,// 是否开启调试模式，调试的时候可以开启调试模式部署后会看到打印信息。config ok代表成功
      appId: appId,         // 必填，公众号的唯一标识，填自己的！
      timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
      nonceStr: nonceStr,   // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ['updateAppMessageShareData'],
      url: encodeURIComponent(url),
      openTagList: ["wx-open-launch-weapp"] // 跳转小程序时必填
    }
    wx.config(obj)
    wx.ready(function (res) {
      console.log(res)
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
      console.log(res)
    });
  },
  mounted(){
  },
}
</script>
<style lang="scss" scoped>
  .share-card {
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.16);
    border-radius: 30px;
    margin-bottom: 0.6rem;
    >img {
      width: 100%;
      height: 2.74rem;
    }
    &-title {
      color: #222;
      font-size: 0.38rem;
      padding: 0.38rem 0;
      border-bottom: 0.01rem solid #f0f0f0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.5;
    }
    &-my {
      padding-top: 0.4rem;
      overflow: hidden;
    }
    &-notice {
      margin-top: 0.3rem;
      margin-bottom:0.15rem;
      background-color: #DCF4F8;
      padding: 0.3rem;
      border-radius: 0.1rem;
      font-size: 0.3rem;
    }
    &-xcx {
      position: absolute;
      width: 4.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.28rem;
      color: #fff;
      font-weight:bold;
      left: 50%;
      transform: translate(-50%, 0);
      margin-top: 1rem;
      background: #FE7119;
      border-radius: 0.4rem;
      box-shadow: 0rem 0.1rem 0.2rem rgba(252, 76, 39, 0.23);
    }
  }
  .my {
    &-avatar {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      float: left;
    }
    &-info {
      float: left;
      padding-left: 0.3rem;
      line-height: 0.48rem;
    }
    &-name {
      font-size: 0.3rem;
      font-weight: 500;
      color: #333;
    }
    &-text {
      color: #939393;
      font-size: 0.26rem;
    }
  }
  .notice {
    &-text {
      color: #333;
      font-size: 0.30rem;
      font-weight: 500;
    }
    &-fire{
      font-size: 0.30rem;
      margin-top: 0.12rem;
      display: flex;
      align-items: center;
      > img{
        width: 0.28rem;
        height: 0.36rem;
        display: inline-block;
        margin-right: 0.1rem;
      }
      &-red{
        color: #FF2C00;
      }
      > span{
        display: inline-block;
      }
    }
  }
</style>