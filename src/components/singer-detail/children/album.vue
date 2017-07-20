<template>
  <section class="album">
    <ul class="list">
      <li class="item" v-for="item in hotAlbums">
        <img v-lazy="item.picUrl" class="avatar">
        <div class="name">
          {{item.name}}
        </div>
        <div class="publish-time">{{item.publishTime | getLocalTime}}</div>
      </li>
    </ul>
    <button :disable="disable" class="loadMore-text" @click="loadMore" v-show="hasMore">加载更多</button>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getArtistAlbum} from 'api/singer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'album',
    data() {
      return {
        title: "歌手专辑",
        hotAlbums: [],
        limit: 20,
        offset: 0,
        hasMore: true,
        disable: false
      }
    },
    /*props: {
      hotSongs: {
        type: Array,
        default: ''
      }
    },*/
    computed: {
      ...mapGetters([
        'singer'
      ]),
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.$route.params.id) {
          vm.$router.push('/home/singer')
          return
        }
        vm._getArtistAlbum(vm.$route.params.id)
      })
    },
    methods: {
      _getArtistAlbum(id){
        getArtistAlbum(id, this.limit, this.offset).then(res => {
          if (res.code === CODE) {
            this.hotAlbums = res.hotAlbums
            this.hasMore = res.more
          }
        })
      },
      loadMore(){
        if (this.hasMore) {
          this.disable = true
          this.offset += this.limit
          getArtistAlbum(this.$route.params.id, this.limit, this.offset)
            .then(res => {
              if (res.code === CODE) {
                this.hotAlbums = this.hotAlbums.concat(res.hotAlbums)
                this.hasMore = res.more
                this.disable = false
              }
            })
            .catch(error => {
              this.disable = false
            })
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .album
    .list
      display flex
      justify-content flex-start
      flex-wrap wrap
      .item
        position relative
        width 141px
        margin-right 40px
        margin-bottom 20px
        &:after
          content ''
          position absolute
          left 0
          top 0
          width 141px
          height 125px
          background url("./album_cover.png") no-repeat center
          background-size cover
        .avatar
          width 125px
          height 125px
        .name
          width 125px
          line-height 20px
        .publish-time
          line-height 20px
          font-size 12px
          color #999
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
