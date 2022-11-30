import Vue from 'vue'
import App from './App.vue'

// 引入VueRouter 
import VueRouter from 'vue-router'

// 引入路由器
import router from './router'

// 引入elementUI部分组件
// import {Container,Header,Aside,Main} from 'element-ui'
// import {Button,Input} from 'element-ui'

// 引入elementUI组件
import ElementUI from 'element-ui';
// 引入elementUI组件样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// Vue.use(Container,Aside,Main)
// Vue.component(Container.name, Container); 
// Vue.component(Button.name, Button); 
// Vue.component(Input.name, Input); 

// 使用ElementUI插件
Vue.use(ElementUI)

// 应用插件
Vue.use(VueRouter)

// 引入store
import store from './store/index.js'

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store,      // store:store 简写
})
