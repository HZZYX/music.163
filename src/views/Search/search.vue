<template>
  <div>
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="keyword"
      @input="inputFn"
    />

    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="songList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(hot, index) in hotArr"
          :key="index"
          @click="changeKeyWord(hot.first)"
        >
          {{ hot.first }}
        </span>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-show="songList.length != 0">
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="(obj, index) in songList"
          :key="index"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearch, searchResultList } from "../../utils/index.js";
import debounce from "lodash/debounce";
import SongItem from "../../components/SongItem.vue";
export default {
  name: "search-index",
  data() {
    return {
      keyword: "",
      hotArr: [],
      songList: [],
      loading: false, // 加载中 (状态) - 只有为false, 才能触底后自动触发onload方法
      finished: false, // 未加载全部 (如果设置为true, 底部就不会再次执行onload, 代表全部加载完成)
      page: 1, // 当前搜索结果的页码F
    };
  },
  components: {
    SongItem,
  },
  created() {
    this.getHotArr();
  },
  watch: {
    keyword: {
      deep: true,
      immediate: true,
      handler() {
        this.playSearch();
      },
    },
  },
  methods: {
    async getHotArr() {
      const res = await hotSearch();
      this.hotArr = res.result.hots;
    },
    changeKeyWord(word) {
      this.keyword = word;
    },
    /*
      防抖：用户在频繁的触发函数，这样会导致页面更新不及时、浏览器反应不过来有可能出现卡顿现象，或者请求还未回来就再次发送新的请求
      而防抖的作用就是，用户的多次或者频繁触发函数，我们只执行用户最后一次触发。

      let t = null;
      inp.oninput = function(){
        if(t !== null){
          clearTimeout(t);
        }

        t = setTimeout(()=>{
          console.log(this.value);
        })
      }

      防抖原理：
          1.先定义一个变量 let t = null
          2.当用户触发了函数，我们会在函数内部开启一个延时计时器
          t = setTimeout(()=>{
            // 真正的操作代码区域
            console.log(this.value);
          })
          3.如果在x秒内用户再次触发了函数，我们会先关闭之前的延时计时器，然后开启一个新的定时器。
          if(t !== null){
            clearTimeout(t);
          }
          4.当x秒内用户没有再触发函数，我们就执行真正的操代码
          5.否则重复执行步骤 3
    */
    /*
      这里没办法用ES6的语法写，只能用ES5的语法
      key:value的形式
      const result = debounce(func, [wait=0], [options=])
      调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。
      返回类型是一个函数
    */
    async getList() {
      // 触发查询结果方法
      const res = await searchResultList({
        keywords: this.keyword,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
      return res;
    },
    playSearch: debounce(async function () {
      const res = await this.getList();
      if (res.code === 400 || res.result.songs === undefined) {
        this.songList = [];
        return;
      }
      this.songList = res.result.songs;
    }, 1200),
    inputFn() {
      // 搜索框值改变
      if (this.keyword.length === 0) {
        // 搜索关键字如果没有，就把搜索结果清空阻止网络请求发送（提前return）
        this.songList = [];
        return;
      }
      this.playSearch();
    },
    async onLoad() {
      // 触底事件(要加载下一页的数据咯), 内部会自动把loading改为true
      this.page++;
      const res = await this.getList();

      if (res.code === 400 || res.result.songs === undefined) {
        this.finished = true; // 全部加载完成(list不会在触发onload方法)
        this.loading = false; // 本次加载完成
        return;
      }
      this.songList = [...this.songList, ...res.result.songs];
      this.loading = false; // 数据加载完毕-保证下一次还能触发onload
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  argin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

.test {
  /*
    box-shadow: 0 0 10px 0px #000;
    filter: drop-shadow(0px 0px 10px #000);
  */

  /*
    1.h-shadow 必需的。水平阴影的位置。允许负值。
    2.v-shadow 必需的。垂直阴影的位置。允许负值。
    3.blur     可选。模糊距离。
    4.spread   可选。阴影的大小，即高度。
    5.color    可选。阴影的颜色。
    6.inset    可选。从外层的阴影（开始时）改变阴影内侧阴影。 
  */
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.5) inset;
  border-right: 5px;
}

/* 给单元格设置底部边框 */
.search_wrap .van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
