import axios from 'axios'
//获取热门歌手
export function getHotArtists(limit, offset) {
  return axios.get('/top/artists', {
    params: {
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌手单曲
export function getArtistSongs(id) {
  return axios.get('/artists', {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌手MV
export function getArtistMV(id, limit, offset) {
  return axios.get('/artist/mv', {
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌手专辑
export function getArtistAlbum(id, limit, offset) {
  return axios.get('/artist/album', {
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取歌手描述
export function getArtistDesc(id) {
  return axios.get('/artist/desc', {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取相似歌手
export function getSimiArtists(id) {
  return axios.get('/simi/artist', {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
