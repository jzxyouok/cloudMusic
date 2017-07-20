<template>
  <section class="playlist-hot">
    <div class="channel">
      <ul class="list">
        <router-link tag="li" :to="'/songListDetail?id='+item.id" class="item" v-for="(item,index) in playList"
                     :key="index">
          <div class="icon">
            <img class="avatar" v-lazy="item.coverImgUrl">
            <div class="playCount"><span class="icon-play"></span> {{item.playCount | numToWan}}</div>
          </div>
          <div class="name">{{item.name}}</div>
          <div class="creator">{{item.creator.nickname}}</div>
        </router-link>
      </ul>
      <button :disabled="loading" class="loadMore-text" @click="loadMore">加载更多</button>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getTopPlaylist} from 'api/index'
  import {mapGetters} from 'vuex'
  export default {
    name: 'test',
    data() {
      return {
        title: "热门歌单",
        currentIndex: 'hot',
        order: 'hot',
        limit: 20,
        offset: 0,
        hasMore: true,
        loading: false,
        playList: []
      }
    },
    created () {
      this._getTopPlaylist(this.order, this.limit)
    },
    methods: {
      _getTopPlaylist(order, limit){
        getTopPlaylist(order, limit).then(res => {
          if (res.code === CODE) {
            this.playList = res.playlists
            console.log(this.playList)
          }
        })
      },
      selectItem(type){
        this.order = type
        this._getTopPlaylist(this.order, this.limit)
      },
      loadMore(){
        if (this.hasMore) {
          this.loading = true
          this.offset += this.limit
          getTopPlaylist(this.order, this.limit, this.offset).then(res => {
            if (res.code === CODE) {
              this.playList = this.playList.concat(res.playlists)
              console.log(this.playList)
              this.hasMore = res.more
              this.loading = false
            }
          })
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .playlist-hot
    .channel
      margin 0 auto
      .list
        display flex
        justify-content space-between
        flex-wrap wrap
        .item
          position relative
          width 18%
          margin-bottom 10px
          overflow hidden
          cursor pointer
          .icon
            position relative
            padding-top 100%
            overflow hidden
            .playCount
              position absolute
              left 0
              top 0
              right 0
              line-height 20px
              padding-right 5px
              background-image linear-gradient(-90deg, rgba(0, 0, 0, .3), transparent)
              color $color-background-ll
              font-size 12px
              text-align right
            .avatar
              position absolute
              left 50%
              top 50%
              transform translate(-50%, -50%)
              width 100%
              display block
          .name
            flex 1
            line-height 22px
            .singer, .desc
              color #999
              font-size 12px
          .creator
            color #999
            font-size 13px
      .loadMore-text
        width 100%
        border-radius 4px
        line-height 40px
        background #f3f5f9
        color #222
        text-align center
        cursor pointer
        transition all .3s
        &[disabled]
          opacity .5
        &:hover
          background $color-theme
          color #fff
</style>
