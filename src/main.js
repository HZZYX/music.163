import Vue from "vue";
// import Vue from "./components/vant/index.js";
import App from "./App.vue";
import "./mobile/flexible.js"; // 适配
import "./styles/reset.css"; // 初始化样式
import router from "./router/index.js";
import './components/vant/index.js'
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
