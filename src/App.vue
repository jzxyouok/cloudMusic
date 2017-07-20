<template>
  <div id="app">
    <top></top>
    <navigation></navigation>
    <keep-alive>
      <router-view ref="container"></router-view>
    </keep-alive>
    <login v-show="loginFlag"></login>
    <player ref="player"></player>
    <!--<drag v-if="mv">
      <div class="video-wrapper">
        <span class="icon-close" @click="closeVideo"></span>
        <video class="video" :src="'/mv/url?url='+mv.url[240]" autoplay controls width="400"></video>
      </div>
    </drag>-->
    <drag v-show="lyricFlag">
      <div class="playingLyric">{{playingLyric}}</div>
    </drag>
  </div>
</template>

<script>
  import Top from 'components/top/top'
  import Navigation from 'components/navigation/navigation'
  import Login from 'components/login/login'
  import Player from 'components/player/player'
  import Drag from 'base/drag/drag'

  import {mapGetters, mapMutations} from 'vuex'
  import {getStore, removeStore} from 'common/js/common'
  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'loginFlag',
        'playingLyric',
        'lyricFlag',
        'mv',
      ]),
    },
    created(){
      if (document.cookie) {
        this.setUserInfo(JSON.parse(getStore('userInfo')))
      } else {
        removeStore('userInfo')
      }

    },
    methods: {
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO',
        setMv: 'SET_MV'
      }),
      closeVideo(){
        this.setMv('')
      },
    },
    components: {
      Top,
      Navigation,
      Login,
      Player,
      Drag,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow hidden
    background #fff
    .video-wrapper
      position relative
      &:hover
        .icon-close
          display block
          cursor pointer
      .icon-close
        position absolute
        right 0
        top 0
        z-index 11
        display none
    .playingLyric
      opacity .8
</style>
