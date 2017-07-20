import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import './config/rem'
import Filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理
Filters(Vue)
var FastClick = require('fastclick')
FastClick.attach(document.body)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg'),
  error: require('common/image/error.jpg')
})
//import vueResource from 'vue-resource'
//Vue.use(vueResource)
import './common/stylus/index.styl'
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
