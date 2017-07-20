<template>
  <section class="search">
    <div class="tab">
      <div class="tab-header">
        <ul class="left">
          <router-link tag="li" to="/search/songs" class="item">单曲</router-link>
          <router-link tag="li" to="/search/artists" class="item">歌手</router-link>
          <router-link tag="li" to="/search/albums" class="item">专辑</router-link>
          <router-link tag="li" to="/search/mv" class="item">mv</router-link>
          <li class="item">歌单</li>
          <li class="item">歌词</li>
          <li class="item">主播电台</li>
          <li class="item">用户</li>
        </ul>
        <div class="right"></div>
      </div>
      <div class="tab-body">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        title: "搜索",
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .search
    position absolute
    left 250px
    right 0
    top 50px
    bottom 50px
    overflow-x hidden
    overflow-y auto
    padding 0 20px
    .tab
      margin 10px 0
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
            &.router-link-exact-active
              background $color-theme
              color #fff
      .tab-body
        padding-top 20px
</style>
