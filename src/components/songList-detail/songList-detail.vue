<template>
  <section class="detail" v-if="songListDetail">
    <div class="header">
      <img :src="songListDetail.coverImgUrl" class="avatar">
      <div class="info">
        <div class="name">
          <span class="label">歌单</span>{{songListDetail.name}}
        </div>
        <div class="user">
          <img :src="songListDetail.creator.avatarUrl" class="avatar">
          <span class="nickname">{{songListDetail.creator.nickname}}</span>
          <time class="createTime">{{songListDetail.createTime | getDateTimeStamp}}创建</time>
        </div>
        <div class="tags">标签：<span class="tag">{{tags}}</span></div>
        <div class="desc">简介：{{songListDetail.description}}</div>
        <div class="btn-play" @click="random"><span class="icon-music"></span> 随机播放全部</div>
      </div>
    </div>
    <div class="tab">
      <div class="tab-header">
        <ul class="left">
          <li class="item current">歌曲列表</li>
          <li class="item">评论</li>
          <li class="item">收藏者</li>
        </ul>
        <div class="right"></div>
      </div>
      <div class="tab-body">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>操作</th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in songs" :key="index">
            <td class="num">
              <span v-if="index<9">0{{index+1}}</span>
              <span v-else>{{index+1}}</span>
            </td>
            <td class="operation">
              <span class="icon-love"></span>
              <span class="icon-download"></span>
            </td>
            <td class="name" @click="selectSong(item,index)">{{item.name}}</td>
            <td class="singer">
              {{item.singer}}
            </td>
            <td class="album">{{item.album}}</td>
            <td class="during">{{item.duration}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--<audio v-if="songURL" :src="songURL.url" autoplay width="0" height="0"></audio>-->
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getSongListDetail, getSongDetail, getSongURL} from 'api/detail'
  import {mapActions} from 'vuex'
  import {createSong} from 'common/js/song'
  export default {
    name: 'songList-detail',
    data() {
      return {
        title: "歌单详情",
        songListDetail: null,
        song: null,
        songs: [],
        songURL: null
      }
    },
    created () {
      this._getSongListDetail(this.$route.query.id)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm._getSongListDetail(vm.$route.query.id)
      })
    },
    computed: {
      tags(){
        return this.songListDetail.tags.join(' / ')
      }
    },
    methods: {
      _getSongListDetail(id){
        if (!this.$route.query.id) {
          this.$router.push({path: '/'})
          return
        }
        getSongListDetail(id).then(res => {
          if (res.code === CODE) {
            this.songListDetail = res.playlist
            this.songs = this._normalizeSongs(res.playlist.tracks)
            this.songs.forEach(song => {
              getSongURL(song.id).then(res => {
                if (res.code === CODE) {
                  song.url = res.data[0].url
                }
              })
            })
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      selectSong(item, index){
        //设置播放列表
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .detail
    position absolute
    left 250px
    right 0
    top 50px
    bottom 50px
    overflow auto
    .header
      display flex
      padding 20px
      .avatar
        width 200px
        height 200px
        margin-right 20px
      .info
        flex 1
        display flex
        flex-direction column
        justify-content space-around
        .name
          font-size 18px
          .label
            display inline-block
            width 40px
            line-height 20px
            text-align center
            background $color-theme
            color #fff
            border-radius 2px
            margin-right 10px
            font-size 14px
        .user
          height 32px
          display flex
          align-items center
          margin: 10px 0
          .avatar
            width 32px
            height 32px
            border-radius 50%
            margin-right 4px
          .nickname
            margin-right 10px
          .createTime
            color #999
        .tags
          .tag
            color #3d66af
        .desc
          line-height 20px
          margin: 10px 0
        .btn-play
          display inline-block
          width 120px
          text-align center
          line-height 30px
          border 1px solid #eee
          border-radius 15px
          color #666
          .icon-music
            font-size 12px
    .tab
      .tab-header
        height 30px
        display flex
        justify-content space-between
        border-bottom 1px solid $color-theme
        padding 0 20px
        background #fff
        position -webkit-sticky
        position sticky
        top 0
        z-index 1
        .left
          .item
            display inline-block
            width 83px
            line-height 30px
            text-align center
            margin-right 10px
            &.current
              background $color-theme
              color #fff
      .tab-body
        .table
          width 100%
          text-align left
          color #999
          thead
            color #666
            th
              line-height 32px
          tbody
            tr
              background #fff
              cursor pointer
              &:nth-child(2n+1)
                background #f3f5f9
              &:hover
                background #f3f5f7
              td
                font-size 13px
                line-height 32px
                [class^="icon-"], [class*=" icon-"]
                  font-size 14px
                &.num
                  width 40px
                  text-align center
                &.operation
                  width 60px
                &.name
                  color #111
                &.during
                  width 80px
</style>
