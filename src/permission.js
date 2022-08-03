import router from '@/router'
import store from '@/store'
// to:去哪里
// from：从哪里来
// next：执行
// 路由全局前置守卫
// 会在所有路由进入之前触发
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 进行权限控制
  // 调用next() 进入该路由
  const token = store.state.user.token
  if (token) {
     if(!store.state.user.userInfo.userId) {
       await store.dispatch('user/getUserInfo')
 }
    if (to.path !== '/login') next('/login')
    next()
  } else {
    if (whiteList.includes(to.path)) next()
    next('/login')
  }
})
