import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/reset.css'
import '@/assets/style/iconfont.css'
import '@/assets/style/common.css'
import '@/plugins/element'
import 'element-theme-chalk'

import axios from 'axios'

axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
