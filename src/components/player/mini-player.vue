<template>
  <section class="mini">
    <div class="mini-wrapper">
      <div class="currentSong" v-if="playlist.length>0" v-show="!fullScreen">
        <img :src="currentSong.image" class="avatar" @click="setFullScreen(true)">
        <div class="info">
          <div class="name">{{currentSong.name}}</div>
          <div class="singer">{{currentSong.singer}}</div>
        </div>
      </div>
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
      <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
             @ended="end"></audio>
    </div>
  </section>
</template>

<script>
  import {playMode} from 'common/js/config'
  import {shuffle} from 'common/js/util'
  import progressBar from 'base/progress-bar/progress-bar'
  import Loading from 'base/aniPlaying/aniPlaying'
  import Switches from 'base/switches/switches'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'mini-player',
    data() {
      return {
        title: "mini播放器",
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
      ...mapGetters([
        'fullScreen',
        'sequenceList',
        'playlist',
        'currentSong',
        'currentIndex',
        'playing',
        'mode',
        'lyricFlag',
      ]),
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
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      },
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlaylist: 'SET_PLAYLIST',
        showPlayingLyric:'SHOW_PLAYING_LYRIC',
      }),
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
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        this.currentTime = this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      ready() {
        this.songReady = true
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      end(){
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
      },
      prev(){
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
        this.songReady = false
      },
      next(){
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
        this.songReady = false
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
    components: {
      progressBar,
      Loading,
      Switches,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .mini
    position fixed
    left 0
    bottom 0
    right 0
    z-index 11
    border-top 1px solid #eee
    height 49px
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
          top 50px
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
