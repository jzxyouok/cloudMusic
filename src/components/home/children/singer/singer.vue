<template>
  <section class="singer">
    <ul class="list">
      <li class="item" v-for="item in artistList" @click="selectItem(item)">
        <div class="avatar">
          <img v-lazy="item.img1v1Url">
        </div>
        <div class="name">{{item.name}}</div>
      </li>
      <button :disable="disable" class="loadMore-text" @click="loadMore" v-show="hasMore">加载更多</button>
    </ul>
    <router-view></router-view>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getHotArtists} from 'api/singer'
  import {mapMutations} from 'vuex'
  export default {
    name: 'singer',
    data() {
      return {
        title: "热门歌手",
        artistList: [],
        limit: 24,
        offset: 0,
        hasMore: true,
        disable: false
      }
    },
    created () {
      this._getHotArtists(this.limit, this.offset)
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      _getHotArtists(limit, offset){
        getHotArtists(limit, offset).then(res => {
          if (res.code === CODE) {
            this.artistList = res.artists
            this.hasMore = res.more
            //console.log(this.artistList)
          }
        })
      },
      loadMore(){
        if (this.hasMore) {
          this.disable = true
          this.offset += this.limit
          getHotArtists(this.limit, this.offset)
            .then(res => {
              if (res.code === CODE) {
                this.artistList = this.artistList.concat(res.artists)
                this.hasMore = res.more
                this.disable = false
              }
            })
            .catch(error => {
              this.disable = false
            })
        }
      },
      selectItem(artist){
        this.$router.push({
          path: `/home/singer/${artist.id}`
        })
        this.setSinger(artist)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .singer
    .list
      display flex
      flex-wrap wrap
      justify-content space-between
      margin 20px auto
      .item
        width 16%
        margin-bottom 20px
        .avatar
          position relative
          padding-top 100%
          overflow hidden
          img
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
            min-width 100%
            height 100%
            display block
        .name
          line-height 25px
      .loadMore-text
        display block
        background #f3f5f9
        width 100%
        line-height 32px
        text-align center
        border-radius 3px
        &[disable]
          opacity .5
</style>
