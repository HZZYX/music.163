import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
// 挂载vueRouter
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history", // 打包上线后需要后台支持, 默认的是:hash
  // routes是固定key( 传入规则数组 )
  routes,
});

export default router;
