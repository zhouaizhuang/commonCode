// 将高频组件注册到全局
export default {
  install(Vue) {
    const r = require.context('.', true, /\.vue$/)
    r.keys().forEach(item => {
      const name = (item.split('\/')[1] || '').replace('/\.vue$/', '')
      if(name) {
        Vue.component(name.replace('/\.vue$/', ''), r(item).default)
      }
    })
  }
}