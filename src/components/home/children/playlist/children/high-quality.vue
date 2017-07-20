<template>
  <transition name="normal">
    <section class="high-quality">
      <div class="channel">
        <div class="tags">
          <strong>热门标签：</strong>
          <span class="tag" :class="{'current':item==cat}" @click="selectItem(item)" v-for="(item,index) in tags">{{item}}<span
            v-if="item==cat">(<span v-if="total">{{total}}</span><span v-else>0</span>)</span> </span>
        </div>
        <ul class="list" v-if="playList.length>0">
          <router-link tag="li" :to="'/songListDetail?id='+item.id" class="item" v-for="(item,index) in playList"
                       :key="index">
            <div class="icon">
              <img class="avatar" v-lazy="item.coverImgUrl">
              <div class="playCount"><span class="icon-play"></span> {{item.playCount | numToWan}}</div>
            </div>
            <div class="name">{{item.name}}</div>
          </router-link>
        </ul>
        <div class="no-data" v-else>没有获取到数据</div>
        <div class="loadMore-text" @click="loadMore" v-show="hasMore">加载更多</div>
      </div>
    </section>
  </transition>
</template>

<script>
  import {CODE} from 'api/config'
  import {getHighQuality} from 'api/index'
  import {mapGetters} from 'vuex'
  export default {
    name: 'highQuality',
    data() {
      return {
        title: "精品歌单",
        tags: ['华语', '欧美', '韩语', '日语', '粤语', '小语种', '运动', 'ACG', '后摇', '古风', '器乐', '说唱', '古典', '爵士', '摇滚', '流行', '民谣', '电子', '轻音乐', '影视原声', '怀旧',],
        cat: '华语',
        limit: 20,
        page: 1,
        hasMore: true,
        total: '',
        playList: []
      }
    },
    created () {
      this._getHighQuality()
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      _getHighQuality(){
        getHighQuality(this.cat, this.limit).then(res => {
          if (res.code === CODE) {
            this.playList = res.playlists
            this.total = res.total
            console.log(this.playList)
            this.hasMore = res.more
            this.total = res.total
          }
        })
      },
      selectItem(item){
        if(this.cat == item){
          return
        }
        this.cat = item
        this.hasMore = true
        this.limit = 20
        getHighQuality(item, this.limit).then(res => {
          if (res.code === CODE) {
            this.playList = res.playlists
            console.log(this.playList)
            this.hasMore = res.more
            this.total = res.total
          }
        })
      },
      loadMore(){
        if (this.hasMore) {
          this.limit += 20
          getHighQuality(this.cat, this.limit).then(res => {
            if (res.code === CODE) {
              this.playList = res.playlists
              console.log(this.playList)
              this.hasMore = res.more
            }
          })
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .high-quality
    .channel
      margin 0
      .tags
        line-height 25px
        margin-bottom 10px
        .tag
          cursor pointer
          color #999
          margin 0 15px
          &.current, &:hover
            color $color-theme
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
              width 100%
              display block
          .name
            flex 1
            line-height 22px
            .singer, .desc
              color #999
              font-size 12px
      .loadMore-text
        border-radius 4px
        line-height 40px
        background #f3f5f9
        color #222
        text-align center
        cursor pointer
        transition all .3s
        &:hover
          background $color-theme
          color #fff
</style>
