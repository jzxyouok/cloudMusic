import axios from 'axios'

//获取新碟上架
export function getNewAlbum(limit, offset) {
  return axios.get('/top/album', {
    params: {
      limit: limit,
      offset: offset
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
