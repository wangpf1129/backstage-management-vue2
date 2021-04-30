import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页，则直接放行
  if (to.path === '/login') { return next() }
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token则强制跳转到登录页
  if (!tokenStr) { return next('/login') }
  next()
})
export default router
