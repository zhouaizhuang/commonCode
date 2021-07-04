import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/*************1、路由架构。动态加载！*************** */
/*************require.context可以匹配到符合正则的路径，可以用于实现动态导入********** */
const r = require.context('.', true, /\.js/)
var routerList = []
r.keys().forEach(item => {
  if(item === './index.js') { return }
  const routeItem = r(item).default
  routerList = Array.isArray(routeItem) ? [...routerList, ...routeItem] : [...routerList, routeItem]
})
const routes = [  
  {
    path: '/',
    name: 'Home',
    component:  () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component:  () => import('@/views/Login.vue')
  },
  ...routerList,
]
const router = new VueRouter({ routes })
/***************2、权限管理**************** */
function getToken(){
  return window.localStorage.getItem('token')
}
router.beforeEach((to, from, next) => {
  if(!getToken() && to.meta.needLogin) {
    return next({ path: '/login' })
  }
  next()
})
/***************路由导出************** */
export default router
