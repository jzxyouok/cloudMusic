<template>
  <section class="top">
    <div class="logo-wrapper">
      <span class="icon-logo"></span>
      <div class="text">
        <h5 class="title">网易云音乐</h5>
        <small class="sub-title">听见好时光</small>
      </div>
    </div>
    <div class="search-wrapper">
      <search-box :placeholder="placeholder" @query="search"></search-box>
    </div>
    <div class="right">
      <div class="user" v-if="!userInfo">
        <i class="icon-people"></i>
        <span @click="login">未登录</span>
        <i class="icon-triangle"></i>
      </div>
      <div class="user" v-else>
        <i class="icon-people"></i>
        <router-link tag="span" to="/profile">{{userInfo.profile.nickname}}</router-link>
        <i class="icon-triangle"></i>
      </div>
      <span class="icon-clothes"></span>
      <span class="icon-settings"></span>
    </div>
  </section>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: 'test',
    data() {
      return {
        title: "顶部导航",
        placeholder:'搜索音乐,歌手,歌词,用户',
      }
    },
    computed:{
      ...mapGetters([
        'userInfo',
      ]),
    },
    created () {

    },
    methods: {
      ...mapMutations({
        showLogin: 'SHOW_LOGIN',
        setKeyword: 'SET_KEYWORD',
      }),
      login(){
        this.showLogin(true)
      },
      search(query){
        this.setKeyword(query)
        this.$router.push({path:'/search'})
      },
    },
    components:{
      SearchBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .top
    height 50px
    display flex
    justify-content space-between
    align-items center
    background $color-theme
    color #fff
    .logo-wrapper
      width 250px
      display flex
      .icon-logo
        font-size 40px
        margin-right 3px
      .text
        display flex
        flex-direction column
        justify-content space-around
        .title
          font-size 17px
        .sub-title
          font-size 12px
    .search-wrapper
      flex 1
    .right
      width 200px
      height 100%
      display flex
      justify-content space-around
      align-items center
      color $color-background-ll
      .user
        .icon-people
          padding 8px
          background #eee
          border-radius 50%
      .icon-clothes,icon-settings
        font-size 15px

</style>
