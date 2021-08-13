<!--参考链接： https://www.jianshu.com/p/a11b6b22c439-->
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message = '', duration = 2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>
<style scoped>
/* fixed 居中 */
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 0.1rem;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: aliceblue;
  z-index: 9999;
  font-size: 0.24rem;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>