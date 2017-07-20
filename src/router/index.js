import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('../components/home/home')), 'home')//首页
const dj = r => require.ensure([], () => r(require('../components/home/children/dj/dj')), 'dj')//首页->个性推荐
const newSong = r => require.ensure([], () => r(require('../components/home/children/newSong/newSong')), 'newSong')//首页->最新歌曲
const playlist = r => require.ensure([], () => r(require('../components/home/children/playlist/playlist')), 'playlist')//首页->推荐歌单
const highQuality = r => require.ensure([], () => r(require('../components/home/children/playlist/children/high-quality')), 'highQuality')//首页->推荐歌单->精品
const playlistNew = r => require.ensure([], () => r(require('../components/home/children/playlist/children/playlist-new')), 'playlistNew')//首页->推荐歌单->最新
const playlistHot = r => require.ensure([], () => r(require('../components/home/children/playlist/children/playlist-hot')), 'playlistHot')//首页->推荐歌单->热门
const rank = r => require.ensure([], () => r(require('../components/home/children/rank/rank')), 'rank')//首页->排行榜
const recommend = r => require.ensure([], () => r(require('../components/home/children/recommend/recommend')), 'recommend')//首页->个性推荐
const singer = r => require.ensure([], () => r(require('../components/home/children/singer/singer')), 'singer')//首页->歌手
const singerDetail = r => require.ensure([], () => r(require('../components/singer-detail/singer-detail')), 'singerDetail')//歌手详情
const singerAlbum = r => require.ensure([], () => r(require('../components/singer-detail/children/album')), 'singerAlbum')//歌手详情->专辑
const singerMV = r => require.ensure([], () => r(require('../components/singer-detail/children/mv')), 'singerMV')//歌手详情->MV
const singerDesc = r => require.ensure([], () => r(require('../components/singer-detail/children/description')), 'singerDesc')//歌手详情->描述
const singerRelate = r => require.ensure([], () => r(require('../components/singer-detail/children/relate')), 'singerRelate')//歌手详情->相似歌手

const songListDetail = r => require.ensure([], () => r(require('../components/songList-detail/songList-detail')), 'songListDetail')//首页->歌单详情

const mvDetail = r => require.ensure([], () => r(require('../components/mv-detail/mv-detail')), 'mvDetail')//首页->歌单详情

const profile = r => require.ensure([], () => r(require('../components/profile/profile')), 'profile')//首页->用户中心
const dayDetail = r => require.ensure([], () => r(require('../components/day-detail/day-detail')), 'dayDetail')//首页->每日推荐歌曲

const search = r => require.ensure([], () => r(require('../components/search/search')), 'search')//首页->搜索
const searchSongs = r => require.ensure([], () => r(require('../components/search/children/songs')), 'searchSongs')//首页->搜索->搜索歌曲
const searchArtists = r => require.ensure([], () => r(require('../components/search/children/artists')), 'searchArtists')//首页->搜索->搜索歌手
const searchAlbums = r => require.ensure([], () => r(require('../components/search/children/albums')), 'searchAlbums')//首页->搜索->搜索专辑
const searchMV = r => require.ensure([], () => r(require('../components/search/children/videos')), 'searchMV')//首页->搜索->搜索专辑

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      redirect: '/home/recommend',
      component: home,
      children: [
        {
          path: '/home/dj',
          component: dj
        },
        {
          path: '/home/newSong',
          component: newSong
        },
        {
          path: '/home/playlist',
          redirect: '/home/playlist/highQuality',
          component: playlist,
          children: [
            {
              path: '/home/playlist/highQuality',
              component: highQuality
            },
            {
              path: '/home/playlist/playlistNew',
              component: playlistNew
            },
            {
              path: '/home/playlist/playlistHot',
              component: playlistHot
            }
          ]
        },
        {
          path: '/home/rank',
          component: rank
        },
        {
          path: '/home/recommend',
          component: recommend
        },
        {
          path: '/home/singer',
          component: singer,
          children: [
            {
              path: ':id',
              component: singerDetail,
              redirect: '/home/singer/:id/album',
              children: [
                {
                  path: 'album',
                  component: singerAlbum
                },
                {
                  path: 'mv',
                  component: singerMV
                },
                {
                  path: 'desc',
                  component: singerDesc
                },
                {
                  path: 'relate',
                  component: singerRelate
                }
              ]
            }
          ]
        },
      ]
    },
    {
      path: '/songListDetail',
      component: songListDetail,
    },
    {
      path: '/profile',
      component: profile,
    },
    {
      path: '/dayDetail',
      component: dayDetail,
    },
    {
      path: '/mvDetail',
      component: mvDetail,
    },
    {
      path: '/search',
      component: search,
      redirect: '/search/songs',
      children: [
        {
          path: 'songs',
          component: searchSongs
        },
        {
          path: 'artists',
          component: searchArtists
        },
        {
          path: 'albums',
          component: searchAlbums
        },
        {
          path: 'mv',
          component: searchMV
        },
      ]
    },
  ]
})
