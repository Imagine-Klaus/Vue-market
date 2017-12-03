// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '@/assets/css/cite.css'
import '@/assets/mui/css/mui.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'


//懒加载插件
import lazyload from 'vue-lazyload'

//图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// import '../static/js/mui.js'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, Axios)
Vue.use(lazyload, {
	preLoad: 1,
  	attempt: 2,
  	listenEvents: [ 'scroll', 'mousewheel' ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

