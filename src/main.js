import Vue from 'vue'
import App from './App.vue'
//引入路由
import VueRouter from 'vue-router'
import router from './router'

//引入store
import store from './store'
Vue.config.productionTip = false

Vue.use(VueRouter)


new Vue({
  render: h => h(App),
  router:router,
  store:store
}).$mount('#app')
