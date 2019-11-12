import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vapi from './plugins/api'
import DefaultLayout from './layouts/Default'
import AdminLayout from './layouts/Admin'

Object.defineProperty(Vue.prototype, '$api', { value: vapi });
Vue.config.productionTip = false
Vue.component('default-layout', DefaultLayout)
Vue.component('admin-layout', AdminLayout)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
