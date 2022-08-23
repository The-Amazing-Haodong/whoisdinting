//socket模块
import { io } from 'socket.io-client'
import Vue from 'vue'
Vue.prototype.socket = io('http://127.0.0.1:3000')//如需本地测试，请设置为'http://127.0.0.1:3000'

