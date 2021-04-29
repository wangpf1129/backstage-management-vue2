import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/reset.css'
import '@/assets/style/iconfont.css'
import '@/assets/style/common.css'
import '@/plugins/element'
import 'element-theme-chalk'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
