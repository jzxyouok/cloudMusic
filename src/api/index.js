import axios from 'axios'

//获得banner
export function getBanner() {
  return axios.get('/banner', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获得每日推荐歌曲(需要登录)
export function getRecommendSongs() {
  return axios.get('/recommend/songs', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取推荐歌单
export function getPersonalized() {
  return axios.get('/personalized', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取独家放送
export function getPrivateContent() {
  return axios.get('/personalized/privatecontent', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取最新音乐
export function getNewSong() {
  return axios.get('/personalized/newsong', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取推荐mv
export function getPersonalizedMV() {
  return axios.get('/personalized/mv', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取主播电台
export function getDJ() {
  return axios.get('/personalized/djprogram', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取精品歌单
//cat: tag, 比如 "华语"、"古风" 、"欧美"、"流行",默认为"全部"
//limit: 取出评论数量,默认为20
export function getHighQuality(cat, limit) {
  return axios.get('/top/playlist/highquality', {
    params: {
      cat: cat,
      limit: limit || 20
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌单(网友精选碟)
//order: 可选值为 'new' 和 'hot',分别对应最新和最热,默认为 'hot'
export function getTopPlaylist(order, limit, offset) {
  return axios.get('/top/playlist', {
    params: {
      order: order || 'new',
      limit: limit || 10,
      offset: offset || 0
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//搜索
/*
 必选参数:
 keywords : 关键词

 可选参数:
 limit : 返回数量,默认为30
 offset : 偏移数量，用于分页,如: 如:(页数-1)*30, 其中 30 为 limit 的值,默认为0

 type: 搜索类型；默认为1即单曲,取值意义:
 1: 单曲
 10: 专辑
 100: 歌手
 1000: 歌单
 1002: 用户
 1004: MV
 1006: 歌词
 1009: 电台
 */
export function search(keywords, limit, offset, type) {
  return axios.get('/search', {
    params: {
      keywords: keywords,
      limit: limit,
      offset: offset,
      type: type
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
