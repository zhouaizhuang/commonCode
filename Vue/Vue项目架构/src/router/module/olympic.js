export default [{
  path: "/activity_list",
  name: "olympic_list",
  meta: {
    icon: "ios-apps",
    title: "活动列表",
    needLogin: false
  },
  component: () => import("@/views/olympic/activity_list/index.vue")
},
{
  path: "/activity_add",
  name: "olympic_add",
  meta: {
    icon: "ios-apps",
    title: "添加活动",
    needLogin: true
  },
  component: () => import("@/views/olympic/activity_add/index.vue")
}]
