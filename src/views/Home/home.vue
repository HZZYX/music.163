<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="7">
      <van-col span="8" v-for="obj in reList" :key="obj.id">
        <van-image width="100%" height="2.8rem" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>

    <p class="title">最新音乐</p>
    <van-cell
      :title="obj.name"
      :label="obj.song.artists[0].name"
      v-for="obj in songList"
      :key="obj.id"
    >
      <template #right-icon>
        <van-icon name="play-circle-o"  size="0.6rem" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from "../../utils/index.js";
export default {
  name: "home-index",
  data() {
    return {
      reList: [],
      songList: [], // 最新音乐数据
    };
  },
  created() {
    this.recommendMusic();
    this.newMusic();
  },
  methods: {
    async recommendMusic() {
      const res = await recommendMusicAPI();
      this.reList = res.result;
      console.log(this.reList);
    },
    async newMusic() {
      const res = await newMusicAPI();
      this.songList = res.result;
    },
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
