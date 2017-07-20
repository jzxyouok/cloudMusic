<template>
  <section class="mv">
    <ul class="list">
      <li class="item" v-for="item in mvs">
        <div class="avatar">
          <img v-lazy="item.imgurl16v9">
          <div class="duration">{{item.duration | formatDuration}}</div>
          <div class="playCount">{{item.playCount | numToWan}}</div>
        </div>
        <div class="name">
          {{item.name}}
        </div>
        <div class="publish-time">{{item.publishTime}}</div>
      </li>
    </ul>
    <button :disable="disable" class="loadMore-text" @click="loadMore" v-show="hasMore">加载更多</button>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getArtistMV} from 'api/singer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'album',
    data() {
      return {
        title: "歌手专辑",
        mvs: [],
        limit: 20,
        offset: 0,
        hasMore: true,
        disable: false
      }
    },
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
        vm._getArtistMV(vm.$route.params.id)
      })
    },
    methods: {
      _getArtistMV(id){
        getArtistMV(id, this.limit, this.offset).then(res => {
          if (res.code === CODE) {
            this.mvs = res.mvs
            this.hasMore = res.hasMore
          }
        })
      },
      loadMore(){
        if (this.hasMore) {
          this.disable = true
          this.offset += this.limit
          getArtistMV(this.$route.params.id, this.limit, this.offset)
            .then(res => {
              this.disable = false
              if (res.code === CODE) {
                this.mvs = this.mvs.concat(res.mvs)
                this.hasMore = res.hasMore
                console.log(this.hasMore)
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
  .mv
    .list
      display flex
      justify-content space-between
      flex-wrap wrap
      .item
        width 19%
        margin-bottom 20px
        .avatar
          position relative
          width 100%
          padding-top 56.15%
          overflow hidden
          img
            position absolute
            left 0
            top 0
            width 100%
            display block
            &[lazy="loading"]
              transform translate(-50%,-50%)
              left 50%
              top 50%
          .duration
            position absolute
            left 3px
            bottom 3px
            color #fff
            font-size 12px
          .playCount
            position absolute
            left 0
            top 0
            right 0
            padding-right 3px
            text-align right
            line-height 20px
            background-image linear-gradient(-90deg, rgba(0,0,0,0.3), transparent)
            color #fff
            font-size 12px
        .name
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
