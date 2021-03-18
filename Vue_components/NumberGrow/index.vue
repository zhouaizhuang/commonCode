<!--数字增长效果-->
<!--使用事例<NumberGrow :value="72123" unit="人"></NumberGrow>-->
<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :style="propStyle">0</span>
  </div>
</template>
<script>
export default {
  props: {
    value: { // 数字多大
      type: Number,
      default: 72123
    },
    unit: {
      type: String, // 数字的单位，默认不填
      default: ''
    },
    propStyle: { // 数字的样式
      type: Object,
      default: function () {
        return { 'font-weight': 400 }
      }
    },
    speed: { // 用于控制数字增长速度，几倍速度
      type: Number,
      default: 1
    },
    delay: { // 延时多久开始播放数字滚动动画
      type: Number,
      default: 0
    },
    type: { // 整型还是浮点型
      type: String,
      default: 'int'
    },
    prev: { // 前缀是$ 还是￥ 之类的，默认为空
      type: String,
      default: ''
    },
    prec: { // 精确到几位小数
      type: Number,
      default: 0
    }
  },
  methods: {
    numberGrow (ele) {
      this.speed = this.speed > 0 ? this.speed : 1
      let step = Math.round(this.value / 70) * this.speed  // speed为1倍速时，也就是70 * 10ms增长结束
      let current = 0
      let start = 0
      let t = setInterval(() => {
        start += step
        if (start > this.value) {
          clearInterval(t)
          start = this.value
          t = null
        }
        if (current === start) { return }
        current = start
        ele.innerHTML = this.formatNumber(current, this.type, this.prev, this.prec, '.', ',') + this.unit
      }, 10)
    },
    formatNumber(num = 0, type = 'float', prev = '￥', prec = 2, dec = '.', sep = ',') {
      num = String(num).replace(/[^0-9+-Ee.]/g, '') || '0'
      prec = Number(prec)
      if((type === 'intFloat' && !num.includes('.')) || num === '0') { return num }
      let [intStr = '', floatStr = ''] = this.round(num, prec).split(dec) // 分割出整数和小数部分
      let re = /(-?\d+)(\d{3})/ // 匹配整数部分每个三位数
      while (re.test(intStr)) { intStr = intStr.replace(re, "$1" + sep + "$2") } // 整数部分三位数添加分隔符如','
      floatStr += new Array(prec + 1).join('0')
      return `${prev}${intStr}${prec > 0 ? dec : ''}${floatStr.slice(0, prec)}`
    },
    round(num, prec = 0) {
      prec = Number(prec)
      prec < 0 && (prec = 0)
      const k = Math.pow(10, prec)
      return String(Math.round(Number(num) * k) / k)
    }
  },
  watch: {
    value() { 
      this.numberGrow(this.$refs.numberGrow)
    }
  },
  mounted () {
    setTimeout(() => {
      this.numberGrow(this.$refs.numberGrow)
    }, this.delay)
  }
}
</script>
<style>
.number-grow-warp{
  transform: translateZ(0);
}
</style>