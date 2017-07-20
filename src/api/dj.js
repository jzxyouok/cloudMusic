import axios from 'axios'

//获取电台分类
export function getDjCate() {
  return axios.get('/dj/catelist', {
    params: {}
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取电台-分类推荐
//登陆后调用此接口,可获得推荐电台
//type: 电台类型,数字,可通过/dj/catelist获取
export function getRecommendDj(type) {
  return axios.get('/dj/recommend/type', {
    params: {
      type:type
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取电台详情
//登陆后调用此接口,传入rid,可获得对应电台的详情介绍
export function getDjDetail(rid) {
  return axios.get('/dj/detail', {
    params: {
      rid:rid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取电台-节目
//说明:登陆后调用此接口,传入rid,可查看对应电台的电台节目以及对应的 id, 需要注意的是这个接口返回的 mp3Url 已经无效,都为 null,
// 但是通过调用 /music/url 这个接口,传入节目 id 仍然能获取到节目音频,如 /music/url?id=478446370 获取代码时间的一个节目的音频
export function getDjProgram(rid) {
  return axios.get('/dj/program', {
    params: {
      rid:rid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
