import Vue from 'vue'
import App from './App'
import {httpGet,httpFetch,httpPost,netService} from "util/http.js"

Vue.config.productionTip = true
Vue.prototype.httpGet=httpGet
Vue.prototype.httpFetch=httpFetch
Vue.prototype.httpPost=httpPost
Vue.prototype.netService=netService
App.mpType = 'app'
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
