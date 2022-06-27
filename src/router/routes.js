export default [
  {
    path: "/",
    name: "index",
    redirect: "/Layout", // 重定向到 /Layout
    // 浏览器url中#后的路径被改变成/find-重新匹配数组规则
  },
  {
    path: "/Layout",
    name: "Layout",
    redirect: "/Layout/Home",
    component: () => import("../views/Layout/layout.vue"),
    children: [
      {
        path: "Home",
        name: "Home",
        meta: { title: "首页" }, //meta保存路由对象的额外信息
        component: () => import("../views/Home/home.vue"),
      },
      {
        path: "Search",
        name: "Search",
        meta: { title: "搜索" },
        component: () => import("../views/Search/search.vue"),
      },
      {
        path: "Play",
        name: "Play",
        meta: { title: "播放音乐" },
        component: () => import("../views/Play/play.vue"),
      },
    ],
  },
];
