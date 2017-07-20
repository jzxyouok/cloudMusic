export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

export const cd = state => state.cd

export const albumInfo = state => state.albumInfo

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList

export const loginFlag = state => state.loginFlag

export const userInfo = state => state.userInfo

export const userID = state => state.userInfo ? state.userInfo.account.id : ''

export const playingLyric = state => state.playingLyric

export const lyricFlag = state => state.lyricFlag

export const keyword = state => state.keyword

export const mv = state => state.mv

