<template>
  <section class="playlist">
    <div class="channel">
      <div class="switch">
        <router-link to="/home/playlist/playlistNew" class="item">最新</router-link>
        <router-link to="/home/playlist/highQuality" class="item">精品</router-link>
        <router-link to="/home/playlist/playlistHot" class="item">热门</router-link>
      </div>
    </div>
    <transition name="normal" mode="in-out">
      <keep-alive>
        <router-view class="playlist-view"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'playlist',
    data() {
      return {
        title: "歌单",
      }
    },
    created () {

    },
    methods: {

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .channel
    .switch
      width 300px
      display flex
      margin 10px auto
      border 1px solid #7c7d85
      border-radius 14px
      .item
        flex 1
        text-align center
        line-height 28px
        color #7c7d85
        &:nth-child(1)
          border-radius 14px 0 0 14px
        &:nth-child(3)
          border-radius 0 14px 14px 0
        &.router-link-exact-active
          background #7c7d85
          color #eee
  .playlist-view
    position fixed
    left 250px
    top 150px
    right 0
    bottom 50px
    padding 20px
    background #fff
    overflow auto
    z-index 1
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.3s
    &.normal-enter, &.normal-leave-to
      transform translate3d(100%,0,0)
</style>
