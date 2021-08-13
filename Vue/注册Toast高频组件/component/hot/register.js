// 高频组件需要主动挂载到全局
// 低频次组件，自己手动引入

import Toast from './Toast/toast'

export default {
  install: function(Vue, options) {
    // 全局注册toast组件
    const toastContrustor = Vue.extend(Toast) // 1.创建组件构造器
    const toast = new toastContrustor() // 2.new，根据组件构造器，创建一个组件对象
    toast.$mount(document.createElement('div')) // 3.将组件对象挂载到元素上
    document.body.appendChild(toast.$el) // 4.toast.$el对应的是div
    Vue.prototype.$toast = toast  // 这里定义之后，那么以后想使用toast组件只需要这样使用：   this.$toast('申请成功', 2000)
    // 后面还可以继续注册其他的高频组件....
    
  }
};
