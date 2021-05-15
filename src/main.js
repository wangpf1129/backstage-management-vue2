import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/reset.css'
import '@/assets/style/iconfont.css'
import '@/assets/style/common.css'
import '@/plugins/element'
import '@/plugins/richTextEditor'
import 'element-theme-chalk'
import axios from 'axios'
// http://timemeetyou.com:8889/api/private/v1/
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
// 请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.filter('dateFormat', function (originVal) {
  const date = new Date(originVal)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const d = (date.getDate() + 1 + '').padStart(2, '0')

  const hh = (date.getHours() + 1 + '').padStart(2, '0')
  const mm = (date.getMinutes() + 1 + '').padStart(2, '0')
  const ss = (date.getSeconds() + 1 + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
