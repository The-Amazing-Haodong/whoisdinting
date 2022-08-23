import Vue from 'vue'
import App from './App.vue'
//导入路由模块
import router from '@/router/index'

//导入vant模块
import './vant.js'

//引入socket.io模块
import '@/socket.io/index.js'

//引入动画样式
import 'animate.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus=this //安装全局事件总线
  },
}).$mount('#app')
