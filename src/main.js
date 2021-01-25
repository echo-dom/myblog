import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:7000/'
// 请求拦截器
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须返回config
  console.log(config);
  return config
})
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
