// 当前这个模块：API进行统一管理
import requests from "./request";

// 请求推荐歌单接口方法
export const recommendMusicAPI = () =>
  requests({
    url: "/personalized",
    method: "GET",
    params: {
      limit: 9,
    },
  });

// 请求最新音乐接口方法
export const newMusicAPI = () =>
  requests({
    url: "/personalized/newsong",
    method: "GET",
    params: {
      limit: 20,
    },
  });

// 热搜关键字
export const hotSearch = (params) =>
  requests({
    url: "/search/hot",
    method: "GET",
    params,
  });

export const searchResultList = (params) =>
  requests({
    url: "/cloudsearch",
    method: "GET",
    params,
  });
