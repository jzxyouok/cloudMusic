<template>
  <section class="index">
    <nav class="nav">
      <ul class="list">
        <router-link tag="li" class="item" v-for="(item,index) in nav" :key="index" :to="item.link">
          <span class="title">{{item.title}}</span>
        </router-link>
      </ul>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </section>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        title: "网易云音乐-听见好时光",
        nav:[
          {
            title:'个性推荐',
            link:'/home/recommend'
          },
          {
            title:'歌单',
            link:'/home/playlist'
          },
          {
            title:'主播电台',
            link:'/home/dj'
          },
          {
            title:'排行榜',
            link:'/home/rank'
          },
          {
            title:'歌手',
            link:'/home/singer'
          },
          {
            title:'最新音乐',
            link:'/home/newSong'
          }
        ]
      }
    },
    created () {

    },
    methods: {},
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .index
    position absolute
    left 250px
    right 0
    top 50px
    bottom 50px
    overflow-x hidden
    overflow-y auto
    padding 0 20px
    .nav
      line-height 50px
      border-bottom 1px solid #eee
      text-align center
      .item
        display inline-block
        padding 0 20px
        cursor pointer
        .title
          display inline-block
          height 100%
        &.router-link-exact-active,&.router-link-active
          .title
            border-bottom 1px solid $color-theme
</style>
