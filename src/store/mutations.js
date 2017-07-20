import * as types from './mutation-types'

const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_CD](state, cd) {
    state.cd = cd
  },
  [types.SET_ALBUM_INFO](state, albumInfo) {
    state.albumInfo = albumInfo
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },

  [types.SHOW_LOGIN](state, status) {
    state.loginFlag = status
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_PLAYING_LYRIC](state, str) {
    state.playingLyric = str
  },
  [types.SHOW_PLAYING_LYRIC](state, status) {
    state.lyricFlag = status
  },
  [types.SET_KEYWORD](state, k) {
    state.keyword = k
  },
  [types.SET_MV](state, mv) {
    state.mv = mv
  },
}

export default matutaions
