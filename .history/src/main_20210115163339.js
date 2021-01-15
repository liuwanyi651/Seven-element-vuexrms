import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TreeTable from 'vue-table-with-tree-grid'
// 编辑器引入
import mavonEditor from 'mavon-editor'

// use: 里面传入一个方法或者对象 这个方法名必须叫install 或者这个对象里面有个属性是install方法
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
