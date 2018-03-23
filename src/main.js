import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './scss/index.scss'
import './scss/iconfont.css'
import { install as ZfbUi } from './src/index';
Vue.use(ZfbUi);

new Vue({
  el: '#app',
    router,
  render: h => h(App)
})
