<template>
  <div>
    <!-- header 头部 -->
    <van-nav-bar :title="activeTitle" fixed />

    <!-- main -->
    <div class="main">
      <router-view></router-view>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/Layout/Home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/Layout/Search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout-index",
  data() {
    return {
      test: "测试",
      activeTitle: "首页",
    };
  },
  watch: {
    $route(newValue) {
      this.activeTitle = newValue.meta.title;
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
