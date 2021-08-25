<!-- 使用方法
具体不同的公司需要使用不同的配置
import UpLoadImg from "./UpLoadImg.vue"
components: {
  UpLoadImg,
},
<UpLoadImg :max_size="5*1024" :file_width="120" :file_height="120" :limit="1" scene="optionImg" :imgArr="gameOption.optionImg" @success="uploadSuc" @delete="delUpload" />
-->
<template>
  <div class="f">
    <div
      class="mr20 rel rds5 ovh" style="width:65px;height:65px;"
      v-for="item in imgList" :key="item.id"
    >
      <div class="h100 topBg" :style="{backgroundImage: 'url(' + item.url + ')' }">
        <div class="trbl0 abs topMask zx100" style="background: rgba(0, 0, 0, 0.6);">
          <div class="h100 f ac xc">
            <Icon type="ios-eye-outline" class="gf poi" size="28"  @click.native="handleView(item.url)" />
            <Icon type="ios-trash-outline" class="gf poi" size="28" @click.native="handleRemove(item.id)"></Icon>
          </div>
        </div>
      </div>
    </div>
    <div class="f1 uploadBox">
      <Upload
        v-if="this.limit > this.imgList.length"
        ref="upload"
        :show-upload-list="false"
        action="https://up.qbox.me"
        :default-file-list="imgList"
        :before-upload="handleBeforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :data="uploadData"
        :format="['jpg','jpeg','png']"
        :on-format-error="handleFormatError"
        :multiple="false"
      >
        <div class='picture'></div>
        <div class='gc fs12' v-if="max_size > 1024 * 1024">大小 {{Math.round(max_size/1024/1024)}}M 以下，建议尺寸 {{file_width}} x {{file_height}} px</div>
        <div class='gc fs12' v-else>大小 {{Math.round(max_size/1024)}}KB 以下，建议尺寸 {{file_width}} x {{file_height}} px</div>
      </Upload>
    </div>
    <Modal title="预览图" v-model="isShowPreview">
      <img :src="previewUrl" v-if="isShowPreview" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import { getQnToken } from '@/api/data'
import Cookies from 'js-cookie'
import { safeGet, guID } from "@/common.js"
export default {
  props: {
    imgArr: {type: Array, default: function(){ return [] } },
    max_size: { type: Number, default: -1 },
    file_width: { type: Number, default: -1 },
    file_height: { type: Number, default: -1 },
    limit: { type: Number, default: -1 },
    scene: { type: String }, // 场景
    format: { type: Array, default: function () { return ['jpg', 'jpeg', 'png'] } },
    fileType: { type: [Number, String], default: function(){ return 0 } }, // 0图片 1视频
  },
  data () {
    return {
      uploadData: {
        token: '',
        scene: '',
        type: ''
      },
      imgList: [],
      isShowPreview: false, // 是否预览图片
      previewUrl: '', // 预览的大图
    }
  },
  methods: {
    // 获取图片上传的token
    getTokenInfo() {  
      getQnToken().then(res => {
        if(res.code != 0) { return this.$Message.error(res.text) }
        Cookies.set('tokenInfo', res.upload_token, { expires: 1 / 24 })
        this.uploadData = { token: res.upload_token, scene: this.scene, type: this.fileType }
      })
    },
    handleBeforeUpload(event, file, fileList) {
      if (this.limit > 0 && this.imgList.length >= this.limit) {
        this.$Notice.info({ title: '无法上传', desc: `最多只能上传${this.limit}张图片` })
        return false
      }
      if (this.max_size > 0 && event.size > this.max_size) {
        this.$Notice.warning({ title: '文件大小超限', desc: `文件 ${event.name} 大小超过了限制` })
        return false
      }
      if (!this.uploadData.token) {
        let token = Cookies.get('tokenInfo')
        if (!token) {
          this.getTokenInfo()
        } else {
          this.uploadData.token = token
        }
      }
    },
    handleSuccess(event, file, fileList) {
      if (this.limit > 0 && this.imgList.length >= this.limit) {
        this.$Notice.info({ title: '上传失败', desc: `最多只能上传 ${this.limit} 张图片` })
        return false
      }
      const { url, size, height, width } = safeGet(() => file.response.data, {})
      if(!url) {
        this.$Notice.error({ title: '上传失败', desc: `没有获取到图片地址` })
        return false
      }
      this.imgList.push({ name: file.name, url, id: guID() })
      this.$emit('success', this.imgList, this.scene)
      this.$Notice.success({ title: '文件上传成功', desc: `文件 ${file.name} 上传成功` })
    },
    handleError(event, file){
      this.$Notice.error({ title: '文件上传失败', desc: `文件 ${file.name} 上传失败` })
      this.getTokenInfo()
    },
    handleFormatError(file){
      this.$Notice.warning({ title: '文件格式不正确', desc: `文件 ${file.name} 格式不正确，请选择图片文件` })
    },
    handleView(url){
      this.isShowPreview = true
      this.previewUrl = url
    },
    handleRemove(id){
      this.imgList = this.imgList.filter(item => item.id !== id)
      this.$emit('delete', this.imgList, this.scene)
    }
  },
  watch: {
    imgArr: function(newVal, oldVal){
      this.imgList = newVal
    }
  },
  created(){
    this.getTokenInfo()
  }
}
</script>
<style scope>
  .uploadBox .ivu-form-item-content{
    line-height:1;
  }
  .topBg{
    background-repeat: no-repeat;      /*是否平铺,repeat-x横  repeat-y纵*/      
    background-position: left top;    /*left right top bottom center 像素*/
    background-size:100% 100%;
  }
  .picture{
    display: inline-block;
    width:65px;
    height:65px;
    border:2px dashed #ccc;
    border-radius: 5px;
    position: relative;
  }
  .picture::before{
    content:'';
    position: absolute;
    width: 20px;
    height:2px;
    background-color: #ccc;
    border-radius:5px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .picture::after{
    content:'';
    position: absolute;
    width: 2px;
    height:20px;
    background-color: #ccc;
    border-radius:5px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .picture:hover::before{
    background-color: #1890ff;
  }
  .picture:hover::after{
    background-color: #1890ff;
  }
  .picture:hover{
    border-color: #1890ff;
  }
  .text{
    color: #ccc;
    font-size: 12px;
  }
  .topMask{
    display: none;
  }
  .topBg:hover .topMask{
    display: block;
  }
</style>