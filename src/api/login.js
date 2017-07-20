import axios from 'axios'

//登录
export function checkLogin(phone, password) {
  return axios.get('/login/cellphone', {
    params: {
      phone: phone,
      password: password
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取用户歌单
export function getUserSongList(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid: uid,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取用户电台
export function getUserDJ(uid) {
  return axios.get('/user/dj', {
    params: {
      uid: uid,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取用户关注列表
export function getFollows(uid, limit, offset) {
  return axios.get('/user/follows', {
    params: {
      uid: uid,
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取用户粉丝列表
export function getFolloweds(uid, limit, offset) {
  return axios.get('/user/followeds', {
    params: {
      uid: uid,
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取用户动态
export function getUserEvent(uid) {
  return axios.get('/user/event', {
    params: {
      uid: uid,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取用户播放记录
export function getUserRecord(uid, type) {
  return axios.get('/user/record', {
    params: {
      uid: uid,
      type: type || 1,//type=1时只返回weekData, type=0时返回allData
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
