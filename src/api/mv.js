import axios from 'axios'
//获取mv详情
export function getMVInfo(mvid) {
  return axios.get('/mv', {
    params: {
      mvid: mvid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取最新MV /mv/first
export function getNewMV(limit) {
  return axios.get('/mv/first', {
    params: {
      limit: limit
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
