<template>
  <section class="player">
    <transition name="scale">
      <div class="main" v-show="fullScreen">
        <div class="bg-player" :style="'backgroundImage: url('+currentSong.image+')'"></div>
        <div class="main-wrapper">
          <div class="icon-right" @click="setFullScreen(false)"></div>
          <div class="main-top">
            <div class="left">
              <div class="avatar" :class="cdCls">
                <img :src="currentSong.image">
              </div>
              <div class="operation">
                <div class="item">喜欢</div>
                <div class="item">收藏</div>
                <div class="item">下载</div>
                <div class="item">分享</div>
              </div>
            </div>
            <div class="right">
              <div class="name">{{currentSong.name}}<span v-if="currentSong.mv" class="label">mv</span></div>
              <div class="alia" v-if="currentSong.alia">{{currentSong.alia}}</div>
              <div class="info">
                <div class="album" :title="currentSong.album">专辑：<span class="value">{{currentSong.album}}</span></div>
                <div class="singer">歌手：<span class="value">{{currentSong.singer}}</span></div>
              </div>
              <div class="lyric">
                <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                  <div class="lyric-wrapper">
                    <div v-if="currentLyric">
                      <p ref="lyricLine"
                         class="text"
                         :class="{'current': currentLineNum ===index}"
                         v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                    </div>
                  </div>
                </scroll>
              </div>
            </div>
          </div>
          <div class="main-bottom">
            <div class="left">
              <h1 class="title">
                听友评论
                <small>(已有{{comment.total}}条评论)</small>
              </h1>
              <div class="input-comment">发表评论</div>
              <dl class="comment-wrapper">
                <dt class="tit">精彩评论</dt>
                <dd class="item" v-for="(item,index) in comment.hotComments" v-if="comment.hotComments.length>0">
                  <img v-lazy="item.user.avatarUrl" class="avatar">
                  <div class="content">
                    <div class="text">
                      <span class="username">{{item.user.nickname}}：</span>{{item.content}}
                    </div>
                  </div>
                </dd>
                <dd v-else>无</dd>
              </dl>
              <dl class="comment-wrapper">
                <dt class="tit">最新评论</dt>
                <dd class="item" v-for="(item,index) in comment.comments" v-if="comment.comments.length>0">
                  <img v-lazy="item.user.avatarUrl" class="avatar">
                  <div class="content">
                    <div class="text">
                      <span class="username">{{item.user.nickname}}：</span>{{item.content}}
                    </div>
                  </div>
                </dd>
                <dd v-else>无</dd>
              </dl>
            </div>
            <div class="right">
              <dl class="col">
                <dt class="tit">相似歌曲</dt>
                <dd class="item" v-for="item in simiSongs" v-if="simiSongs.length>0">
                  <img v-lazy="item.image" class="avatar">
                  <div class="name">{{item.name}}</div>
                  <div class="singer">{{item.singer}}</div>
                </dd>
                <dd v-else>无</dd>
              </dl>
              <dl class="col">
                <dt class="tit">相似歌单</dt>
                <dd class="item" v-for="item in simiSonglist" v-if="simiSonglist.length>0">
                  <img :src="item.coverImgUrl" class="avatar">
                  <div class="content">
                    <div class="name">{{item.name}}</div>
                    <div class="playCount">{{item.playCount | numToWan}}</div>
                  </div>
                </dd>
                <dd v-else>无</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini">
        <div class="mini-wrapper">
          <transition name="slideTop">
            <div class="currentSong" v-show="!fullScreen&&playlist.length>0">
              <img :src="currentSong.image" class="avatar" @click="setFullScreen(true)">
              <div class="info">
                <div class="name">{{currentSong.name}}</div>
                <div class="singer">{{currentSong.singer}}</div>
              </div>
            </div>
          </transition>
          <div class="operation">
            <div class="icon" :class="disableCls">
              <span class="icon-prev" @click="prev"></span>
            </div>
            <div class="icon" :class="disableCls">
              <span :class="playIcon" @click="togglePlaying"></span>
            </div>
            <div class="icon" :class="disableCls">
              <span class="icon-prev next" @click="next"></span>
            </div>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="right">
            <div class="icon" @click="changeMode" :title="mode">
              <span :class="iconMode"></span>
            </div>
            <span :class="lyricCls" @click="_showPlayingLyric"></span>
            <div class="icon" :class="{'red':playlist.length>0}" @click="listFlag=!listFlag">
              <span class="icon-list"></span>
              <span class="num" v-if="playlist.length>0">{{playlist.length}}</span>
            </div>
            <transition name="slide">
              <div class="play-list" v-show="sequenceList.length>0&&listFlag">
                <div class="title">
                  <switches :switches="switches"></switches>
                </div>
                <ul class="list">
                  <li class="item" v-for="(item,index) in sequenceList" @click="selectItem(item,index)">
                    <div class="loading-wrapper">
                      <loading v-if="item.id==currentSong.id"></loading>
                    </div>
                    <div class="name" :title="item.name">{{item.name}}{{item.alia}}</div>
                    <div class="singer" :title="item.singer">{{item.singer}}</div>
                    <div class="duration">{{format(item.duration)}}</div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getSongComment, getDJComment, getSimiSongs, getSimiSonglist} from 'api/detail'
  import {createNewSong} from 'common/js/song'
  import Lyric from 'lyric-parser'
  import {playMode} from 'common/js/config'
  import {shuffle} from 'common/js/util'
  import Scroll from 'base/scroll/scroll'
  import progressBar from 'base/progress-bar/progress-bar'
  import Loading from 'base/aniPlaying/aniPlaying'
  import Switches from 'base/switches/switches'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'player',
    data() {
      return {
        title: "播放器",
        comment: '',
        simiSongs: [],
        simiSonglist: [],
        lyric: '',
        currentLyric: null,
        currentLineNum: 0,
        playingLyric: '',
        isPureMusic: false,
        pureMusicLyric: '',

        songReady: false,
        currentTime: 0,
        listFlag: false,
        switches: [
          {
            name: '播放列表'
          },
          {
            name: '历史记录'
          }
        ]
      }
    },
    computed: {
      iconMode() {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-single_loop' : 'icon-random'
      },
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      lyricCls(){
        return this.lyricFlag ? 'icon-geci red' : 'icon-geci'
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        'fullScreen',
        'sequenceList',
        'playlist',
        'currentSong',
        'currentIndex',
        'playing',
        'mode',
        'lyricFlag',
      ])
    },
    components: {
      Scroll,
      progressBar,
      Loading,
      Switches,
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        this.songReady = false
        if (this.currentLyric) {
          this.currentLyric.stop()
          // 重置为null
          this.currentLyric = null
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
          if (newSong.type == 'DJ') {
            this._getDJComment(newSong.id)
          } else if (newSong.type == 'song') {
            this._getSongComment(newSong.id)
          }
          this.getSimi(newSong.id)
        }, 1000)
      },
      playing(newPlaying) {
        if (!this.songReady) {
          return
        }
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      },
      fullScreen(newVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.lyricList.refresh()
          }, 20)
        }
      }
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlaylist: 'SET_PLAYLIST',
        setPlayingLyric: 'SET_PLAYING_LYRIC',
        showPlayingLyric: 'SHOW_PLAYING_LYRIC',
      }),
      _getSongComment(id){
        getSongComment(id).then(res => {
          if (res.code === CODE) {
            this.comment = res
            //console.log(this.comment)
          }
        })
      },
      _getDJComment(id){
        getDJComment(id).then(res => {
          if (res.code === CODE) {
            this.comment = res
            //console.log(this.comment)
          }
        })
      },
      getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          console.log(lyric)
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },
      handleLyric({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum > 4) {
          let lineEl = this.$refs.lyricLine[lineNum - 4]
          this.$refs.lyricList.scrollToElement(lineEl, 500)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 500)
        }
        this.playingLyric = txt
        this.setPlayingLyric(txt)
      },
      getSimi(id){
        getSimiSongs(id).then(res => {
          if (res.code === CODE) {
            this.simiSongs = this._normalizeSongs(res.songs)
            console.log(this.simiSongs)
          }
        })
        getSimiSonglist(id).then(res => {
          if (res.code === CODE) {
            this.simiSonglist = res.songs
            console.log(this.simiSonglist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createNewSong(musicData))
          }
        })
        return ret
      },
      format(interval) {
        interval = interval | 0//乡下取整,相当于Math.floor()
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      end() {
        this.currentTime = 0
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
      },
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playlist.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
      },
      ready() {
        this.songReady = true
        // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
        if (this.currentLyric && !this.isPureMusic) {
          this.currentLyric.seek(this.currentTime * 1000)
        }
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      onProgressBarChanging (percent) {
        this.currentTime = this.currentSong.duration * percent
        if (this.currentLyric) {
          this.currentLyric.seek(this.currentTime * 1000)
        }
      },
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.currentTime = this.$refs.audio.currentTime = currentTime
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      changeMode() {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlaylist(list)
      },
      resetCurrentIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      selectItem(item, index) {
        if (this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      _showPlayingLyric(){
        this.showPlayingLyric(!this.lyricFlag)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

  .player
    .main
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      z-index 3
      background #fff
      overflow-y auto
      overflow-x hidden
      transform-origin left bottom
      &.scale-enter-active, &.scale-leave-active
        transition: all 0.3s
      &.scale-enter, &.scale-leave-to
        opacity 0
        transform scale3d(0, 0, 0)
      .bg-player
        position absolute
        left 0
        top 0
        overflow hidden
        width 100%
        height 600px
        background-repeat no-repeat
        background-size cover
        background-position 50%
        -webkit-filter blur(60px)
        opacity .6
        -webkit-mask-image linear-gradient(to bottom, #fff 0, #fff 15%, #fff 25%, rgba(255, 255, 255, 0.25) 75%, rgba(255, 255, 255, 0.1) 90%, rgba(255, 255, 255, 0) 100%)
      .main-wrapper
        position relative
        z-index 2
        width 1000px
        margin auto
        padding-bottom 50px
        .icon-right
          font-size 30px
          position absolute
          right -30px
          top 40px
          color rgba(0, 0, 0, .2)
          transform rotate(90deg)
        .main-top
          padding 20px 0
          display flex
          .left
            position relative
            width 500px
            .avatar
              position relative
              display flex
              align-items center
              justify-content center
              width 300px
              height 300px
              margin 30px auto 50px
              background-position center
              background-repeat no-repeat
              background-size cover
              img
                width 250px
                height 250px
                border-radius 50%
              &:before
                content ''
                position absolute
                left -15px
                top -15px
                z-index -1
                width 330px
                height 330px
                background url("./coverall.png") no-repeat
                background-size 100%
                box-shadow 0 0 0 8px rgba(255, 255, 255, .2)
                border-radius 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
            .operation
              width 330px
              margin auto
              display flex
              justify-content space-around
              .item
                width 70px
                line-height 25px
                text-align center
                border 1px solid #999
                border-radius 3px
          .right
            position relative
            flex 1
            padding 20px
            .name
              font-size 20px
              display flex
              align-items center
              .label
                padding 1px 4px
                border 1px solid $color-theme
                border-radius 3px
                font-size 12px
                color $color-theme
                margin-left 4px
            .info
              height 35px
              display flex
              align-items center
              justify-content space-between
              .album
                flex 1
                padding-right 15px
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
            .value
              color #215eb9
            .lyric
              .middle-r
                display: inline-block
                vertical-align: top
                width: 100%
                height 330px
                overflow: hidden
                -webkit-mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .6) 15%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, .6) 85%, rgba(255, 255, 255, 0) 100%)
                .lyric-wrapper
                  overflow: hidden
                  .text
                    line-height: 30px
                    color: $color-text-l
                    font-size: $font-size-medium
                    transition: all .3s
                    &:first-child
                      margin-top 30px
                    &:last-child
                      padding-bottom 100px
                    &.current
                      color: $color-theme
                      font-size: $font-size-medium-x
                      text-shadow: 1px 1px rgba(0, 0, 0, .2), 1px 2px rgba(0, 0, 0, .1)
        .main-bottom
          display flex
          .left
            flex 1
            .title
              font-size 20px
              padding 10px 0
              border-bottom 1px solid #ddd
              small
                color #999
                font-size 12px
            .input-comment
              border 1px solid #ddd
              box-shadow 0 0 0 10px #eee
              margin 30px 10px
              padding 8px
              background #fff
              color #999
            .comment-wrapper
              .tit
                font-size 12px
                color #222
                padding 10px 0
              .item
                position relative
                border-top 1px solid rgba(255, 255, 255, .3)
                display flex
                padding 10px 0
                .avatar
                  width 40px
                  height 40px
                  border-radius 50%
                  margin-right 10px
                .content
                  flex 1
                  font-size 12px
                  color #999
                  .text
                    color #333
                    line-height 20px
                    .username
                      color #215eb9
          .right
            width 240px
            margin-left 30px
          .col
            .tit
              padding 10px 0
              font-size 17px
              border-bottom 1px solid #ddd
            .item
              position relative
              border-top 1px solid rgba(255, 255, 255, .3)
              display flex
              align-items center
              padding 10px 0
              .avatar
                width 40px
                height 40px
                border-radius 50%
                margin-right 10px
              .name
                height 100%
                padding-right 10px
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
              .singer
                color #999
                white-space nowrap
    .mini
      position fixed
      left 0
      bottom 0
      right 0
      z-index 11
      border-top 1px solid #eee
      height 49px
      background rgba(255, 255, 255, .92)
      .mini-wrapper
        height 100%
        display flex
        align-items center
        .currentSong
          position absolute
          left 0
          bottom 50px
          width 249px
          border-right 1px solid #eee
          background #fff
          display flex
          &.slideTop-enter-active, &.minislideTop-leave-active
            transition all 0.4s
            transition-delay .2s
          &.slideTop-enter, &.slideTop-leave-to
            opacity 0
            transform translate3d(0, 100%, 0)
          .avatar
            width 50px
            height 50px
            margin-right 10px
          .info
            flex 1
            display flex
            flex-direction column
            justify-content space-around
            .singer
              color $color-text-d
              font-size 12px
        .operation
          width 200px
          height 100%
          display flex
          align-items center
          justify-content space-around
          .icon
            flex 1
            text-align center
            &.disable
              opacity .7
            [class^="icon-"]
              display inline-block
              background #ea282a
              color #fff
              border-radius 50%
              width 30px
              line-height 30px
              text-align center
            .icon-prev
              font-size 12px
              &.next
                transform rotate(-180deg)
            .icon-play, .icon-pause
              font-size 16px
              width 38px
              line-height 38px
        .progress-wrapper
          flex 1
          display: flex
          align-items: center
          margin: 0px auto
          padding: 10px 0
          .time
            color #333
            font-size 13px
            flex: 0 0 35px
            width: 35px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .right
          width 120px
          height 100%
          display flex
          justify-content space-around
          align-items center
          font-size 16px
          color #777
          .icon-geci
            font-size 24px
            &.red
              color $color-theme
          .icon
            height 50px
            display flex
            align-items center
            &.red
              color $color-theme
              .num
                color $color-theme
            .icon-list
              font-size 24px
            .num
              font-size 12px
              margin-left -4px
              color #999
              margin-top 10px
          .play-list
            position fixed
            right 0
            bottom 50px
            width 500px
            top 0
            background #fff
            box-shadow -6px 0 8px -6px rgba(0, 0, 0, .4)
            overflow-y scroll
            &.slide-enter-active, &.slide-leave-active
              transition all 0.3s ease-out
            &.slide-enter, &.slide-leave-to
              transform translate3d(100%, 0, 0)
            .list
              .item
                position relative
                height 32px
                display flex
                align-items center
                font-size 13px
                color #999
                transition all .2s
                &:nth-child(2n)
                  background #f3f5f9
                &:hover
                  background #e5e5e5
                .loading-wrapper
                  position relative
                  width 50px
                .name
                  flex 1
                  padding-right 15px
                  color #222
                  line-height 32px
                  text-overflow ellipsis
                  overflow hidden
                  white-space nowrap
                .singer
                  width 150px
                  text-overflow ellipsis
                  overflow hidden
                  white-space nowrap
                .duration
                  width 50px
            .title
              height 50px
              display flex
              align-items center
              border-bottom 1px solid #f3f5f9
</style>
