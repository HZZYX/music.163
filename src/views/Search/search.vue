<template>
  <div>
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="keyword"
      @keydown.enter="playSearch"
    />

    <!-- 搜索下容器 -->
    <div class="search_wrap" v-show="isShow">
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
    <div class="search_wrap" v-show="!isShow">
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-cell
        center
        :title="song.name"
        v-for="song in songList"
        :key="song.id"
      >
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { hotSearch, searchResultList } from "../../utils/index.js";
export default {
  name: "search-index",
  data() {
    return {
      keyword: "",
      hotArr: [],
      isShow: true,
      songList: [],
    };
  },
  created() {
    this.getHotArr();
  },
  methods: {
    async getHotArr() {
      const res = await hotSearch();
      this.hotArr = res.result.hots;
    },
    changeKeyWord(word) {
      this.keyword = word;
    },
    async playSearch() {
      const res = await searchResultList({
        keywords: this.keyword,
        limit: 20,
      });
      this.isShow = !this.isShow;
      console.log(res.result.songs);
      this.songList = res.result.songs;
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
</style>
