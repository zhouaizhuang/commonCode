<!--此组件仅仅是参考代码-->
<template>
  <div class="f gf">
    <div class="f1 f ac fs26r">
      <div class="pr10r" style="padding-left:0.4rem;">浏览量</div>
      <div class="gf fs32r f as rel ovh" style="height:40px;transform: translateY(2px)">
        <div class="f xc rw" v-for="(item, index) in detail.viewArr" :key="index">
          <div :style="{width:'0.2rem', transition: 'all ease 1.5s', transform: `translateY(${item * -40}px)`}">
            <div class="w100 f ac xc" style="height:40px;" v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="fs26r f ac pl15r di">次</div>
    </div>
    <div class="f1 f ac fs26r">
      <div class="pr10r" style="padding-left:0.4rem;">参与数</div>
      <div class="gf fs32r f as rel ovh" style="height:40px;transform: translateY(2px)">
        <div class="f xc rw" v-for="(item, index) in detail.playerArr" :key="index">
          <div :style="{width:'0.2rem', transition: 'all ease 1.5s', transform: `translateY(${item * -40}px)`}">
            <div class="w100 f ac xc" style="height:40px;" v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="fs26r f ac pl15r di">人</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Editor',
  props: {
    
  },
  data () {
    return {
      
    }
  },
  methods: {
    getList(){
      let { detail } = data
      detail.viewArr = String(Math.floor(detail.base_view + detail.view)).split('')
      detail.playerArr = String(Math.floor(detail.base_player + detail.player)).split('')
    }
  }
}
</script>
<style lang="less">

</style>
