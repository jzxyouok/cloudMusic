import axios from 'axios'

//获取排行榜
export function getRank(idx) {
  return axios.get('/top/list', {
    params: {
      idx
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
