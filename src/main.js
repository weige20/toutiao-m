import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 根据网页宽度, 设置html的font-size
import 'amfe-flexible'
import { Button, NavBar, Form, Field, Toast, Notify, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Col, Row, Badge, Search, Image as VanImage, Lazyload, Divider, Tag, CellGroup, Dialog, DatetimePicker } from 'vant'
import diretivesObj from '@/utils/directives'
// 加载全局样式
import './style/cover.less'

Vue.use(DatetimePicker)
// 全局注册
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Lazyload)

Vue.use(VanImage)
Vue.use(diretivesObj)

Vue.use(Search)

Vue.use(Badge)

Vue.use(Col)
Vue.use(Row)

Vue.use(Popup)

Vue.use(ActionSheet)

Vue.use(PullRefresh)

// 全局注册
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
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
