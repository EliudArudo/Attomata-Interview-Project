import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'

import '@mdi/font/css/materialdesignicons.css'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { Service } from './services/service'

import { DataProviderPlugin } from './plugins/dataProviderPlugin'

Vue.config.productionTip = false

Vue.use(DataProviderPlugin)

const vue = new Vue({
  router,
  store,
  // vuetify,
  render: h => h(App)
}).$mount('#app')


Service.prototype.$vue = vue