// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import "../src/utils/rem"
import Vant from 'vant';
import 'vant/lib/index.css';
import Mint from 'mint-ui';
import { Dialog } from 'vant';
Vue.use(Mint);
Vue.use(Dialog);
Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false

function TimeDown(id, endDateStr) {
  //结束时间
  var endDate = new Date(endDateStr);
  //当前时间
  var nowDate = new Date();
  //相差的总秒数
  var totalSeconds = parseInt((endDate - nowDate) / 1000);
  //天数
  var days = Math.floor(totalSeconds / (60 * 60 * 24));
  //取模（余数）
  var modulo = totalSeconds % (60 * 60 * 24);
  //小时数
  var hours = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  //分钟
  var minutes = Math.floor(modulo / 60);
  //秒
  var seconds = modulo % 60;
  //输出到页面
  document.getElementById(id).innerHTML = "还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
  //延迟一秒执行自己
  setTimeout(function () {
    TimeDown(id, endDateStr);
  }, 1000)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
