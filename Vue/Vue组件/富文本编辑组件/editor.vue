<template>
  <vue-ueditor-wrap :config="myConfig" v-model="message"></vue-ueditor-wrap>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'Editor',
  components: {
    VueUeditorWrap
  },
  props: {
    msg: {
      type: String,
      default: '',
    },
    config: {
      type: [Array, Object],
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      message: '',
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 240,  // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        serverUrl: process.env.NODE_ENV === 'development' ? 'http://hd.qianfanyun.com/php/controller.php?action=config' : '/php/controller.php', // 上传文件接口
        UEDITOR_HOME_URL: process.env.NODE_ENV === 'development' ? '/static/ueditor/' : '/site_adm/static/ueditor/', // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
      }
    }
  },
  watch: {
    message: function (newQuestion, oldQuestion) {
      this.$emit('change', newQuestion)
    },
    msg: function(newVal, oldVal){
      this.message = newVal
    }
  },
  mounted () {
    this.myConfig = {
      ...this.myConfig,
      ...this.config
    }
  }
}
</script>
<style lang="less">
#editor_5065cf,
.edui-default {
  position: relative;
  z-index: 0;
}
</style>
