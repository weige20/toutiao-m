import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 根据网页宽度, 设置html的font-size
import 'amfe-flexible'
import { Button, NavBar, Form, Field, Toast, Notify, Tabbar, TabbarItem, Icon } from 'vant'

// 加载全局样式
import './style/cover.less'

// 全局注册
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Notify)
Vue.use(Toast)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
