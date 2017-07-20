import axios from 'axios'
//获取歌单详情
export function getSongListDetail(id) {
  return axios.get('/playlist/detail', {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取单曲详情
export function getSongDetail(ids) {
  return axios.get('/song/detail', {
    params: {
      ids: ids
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌曲url
export function getSongURL(id) {
  return axios.get('/music/url', {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌曲评论
export function getSongComment(id, limit, offset) {
  return axios.get('/comment/music', {
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取相似歌曲
export function getSimiSongs(id) {
  return axios.get('/simi/song', {
    params: {
      id: id,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取相似歌单
export function getSimiSonglist(id) {
  return axios.get('/simi/playlist', {
    params: {
      id: id,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌词
export function getLyric(id) {
  return axios.get('/lyric', {
    params: {
      id: id,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取电台评论
export function getDJComment(id, limit, offset) {
  return axios.get('/comment/dj', {
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
