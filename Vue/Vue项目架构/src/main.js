import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import reg from "@/components/common/reg"
import "./common.css"
Vue.use(reg)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
