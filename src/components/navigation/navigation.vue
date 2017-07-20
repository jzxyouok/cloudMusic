<template>
  <section class="navigation">
    <dl class="list" v-for="(val,key) in nav">
      <dt class="title">{{key}}</dt>
      <router-link tag="dd" :to="item.link" v-for="(item,index) in val" :key="index" class="item">
        <span :class="item.icon"></span> {{item.title}}
      </router-link>
    </dl>
    <dl class="list" v-if="userInfo">
      <router-link tag="dt" to="/dayDetail" class="title">每日歌曲推荐</router-link>
    </dl>
    <dl class="list defind" v-if="userInfo">
      <dt class="title">创建的歌单</dt>
      <router-link tag="dd" :to="'/songListDetail?id='+item.id" v-for="(item,index) in createdList" :key="index"
                   class="item">
        <span class="icon-list"></span> {{item.name}}
      </router-link>
    </dl>
    <dl class="list defind" v-if="userInfo">
      <dt class="title">收藏的歌单</dt>
      <router-link tag="dd" :to="'/songListDetail?id='+item.id" v-for="(item,index) in collectedList" :key="index"
                   class="item">
        <span class="icon-list"></span> {{item.name}}
      </router-link>
    </dl>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getUserSongList} from 'api/login'
  import {mapGetters} from 'vuex'
  export default {
    name: 'navigation',
    data() {
      return {
        title: "导航",
        nav: {
          '推荐': [
            {
              'icon': 'icon-music',
              'title': '发现音乐',
              'link': '/home'
            },
            {
              'icon': 'icon-FM',
              'title': '私人FM',
              'link': '/fm'
            },
            {
              'icon': 'icon-mv',
              'title': 'MV',
              'link': '/mv'
            },
          ],
          '我的音乐': [
            {
              'icon': 'icon-fav',
              'title': '我的歌单',
              'link': '/cloud'
            },
            {
              'icon': 'icon-fav',
              'title': '我的电台',
              'link': '/cloud'
            },
            {
              'icon': 'icon-fav',
              'title': '我的关注列表',
              'link': '/cloud'
            },
            {
              'icon': 'icon-fav',
              'title': '我的粉丝列表',
              'link': '/cloud'
            },
            {
              'icon': 'icon-fav',
              'title': '我的动态',
              'link': '/cloud'
            },
            {
              'icon': 'icon-fav',
              'title': '播放记录',
              'link': '/cloud'
            },
            {
              'icon': 'icon-cloud',
              'title': '我的音乐云盘',
              'link': '/cloud'
            },
          ],
        },
        playList: [],//我的歌单
      }
    },
    created () {
      if (this.userInfo) {
        this._getUserSongList(this.userID)
      }
    },
    computed: {
      ...mapGetters([
        'userInfo', 'userID'
      ]),
      createdList(){
        return this.playList.filter(item => {
          return item.subscribed == false
        })
      },
      collectedList(){
        return this.playList.filter(item => {
          return item.subscribed == true
        })
      },
    },
    methods: {
      _getUserSongList(uid){
        getUserSongList(uid).then(res => {
          if (res.code === CODE) {
            this.playList = res.playlist
            console.log(this.playList)
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .navigation
    position absolute
    left 0
    top 50px
    bottom 50px
    overflow auto
    width 249px
    background #f5f5f7
    border-right 1px solid #eee
    .list
      .title
        padding-left 8px
        line-height 35px
        color #999
      .item
        position relative
        line-height 20px
        padding 8px 0
        padding-left 15px
        color #555
        cursor pointer
        &:hover
          color #111
        &.router-link-active
          background #e6e7eb
          color #111
          &:before
            content ''
            position absolute
            left 0
            top 0
            height 100%
            width 3px
            background #c52f30
</style>
