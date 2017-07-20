import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
import {getLyric} from 'api/detail'
import axios from 'axios'

export default class Song {
  constructor({id, singer, name, alia, album, duration, image, url, mv, type}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.alia = alia
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.mv = mv
    this.type = type || 'song'
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            if (res.uncollected) {
              this.lyric = '[00:00.00] 无歌词'
            } else {
              this.lyric = res.lrc.lyric
            }
            resolve(this.lyric)
          } else {
            reject('no lyric')
          }
        })
    })
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    alia: filterSinger(musicData.alia),
    album: musicData.al.name,
    //duration: formatDuration(musicData.dt),
    duration:Math.ceil(musicData.dt / 1000),
    image: musicData.al.picUrl,
    url: '',
    mv: musicData.mv || 0,
    type: 'song'
  })
}
export function createNewSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    alia: filterSinger(musicData.alias),
    album: musicData.album.name,
    //duration: formatDuration(musicData.duration),
    duration:Math.ceil(musicData.duration / 1000),
    image: musicData.album.picUrl,
    url: '',
    mv: musicData.mvid || 0,
    type: 'song'
  })
}
export function createDJ(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    alia: filterSinger(musicData.alias),
    album: musicData.album.name,
    //duration: formatDuration(musicData.duration),
    duration:Math.ceil(musicData.duration / 1000),
    image: musicData.album.picUrl,
    url: '',
    mv: musicData.mvid || 0,
    type: 'DJ'
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
function formatDuration(interval) {
  interval = Math.floor(interval / 1000)
  const minute = interval / 60 | 0
  const second = interval % 60
  return `${minute}:${second}`
}
