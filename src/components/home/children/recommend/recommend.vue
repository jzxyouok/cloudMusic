<template>
  <section class="recommend">
    <div class="carousel-wrapper">
      <carousel :autoplay="false" type="card" height="220px">
        <carousel-item class="el-carousel__item" v-for="(item,index) in banner" :key="index">
          <img :src="item.pic" class="banner-img">
          <span class="title" :style="'background: '+item.titleColor">{{item.typeTitle}}</span>
        </carousel-item>
      </carousel>
    </div>
    <div class="channel">
      <h5 class="title">
        <span>推荐歌单</span>
        <span class="loadMore">更多 <i class="icon-right"></i></span>
      </h5>
      <ul class="list">
        <router-link tag="li" :to="'/songListDetail?id='+item.id" class="item" v-for="(item,index) in personalizedList"
                     :key="index">
          <div class="copywriter">{{item.copywriter}}</div>
          <div class="icon">
            <img class="avatar" v-lazy="item.picUrl">
            <div class="playCount"><span class="icon-play"></span> {{item.playCount | numToWan}}</div>
          </div>
          <div class="name">{{item.name}}</div>
        </router-link>
      </ul>
    </div>
    <div class="channel private">
      <h5 class="title">
        <span>独家放送</span>
        <span class="loadMore">更多 <i class="icon-right"></i></span>
      </h5>
      <ul class="list">
        <li class="item" v-for="item in privateContentList">
          <div class="copywriter">{{item.copywriter}}</div>
          <div class="icon">
            <img class="avatar" v-lazy="item.picUrl">
          </div>
          <div class="name">{{item.name}}</div>
        </li>
      </ul>
    </div>
    <div class="channel newSong">
      <h5 class="title">
        <span>最新音乐</span>
        <span class="loadMore">更多 <i class="icon-right"></i></span>
      </h5>
      <ul class="list">
        <li class="item" v-for="(item,index) in newSongList" @click="selectSong(item,index)">
          <div class="num">
            {{index+1}}
          </div>
          <div class="icon">
            <img class="avatar" v-lazy="item.image">
            <span class="icon-play"></span>
          </div>
          <div class="name">
            <div class="">{{item.name}}</div>
            <div class="singer">
              <router-link @click.stop.prevent tag="span" to="/mvDetail" v-if="item.mv" class="icon-play label"></router-link>
              {{item.singer}}
            </div>
          </div>
          <loading v-if="item.id==currentSong.id"></loading>
        </li>
      </ul>
    </div>
    <div class="channel mv">
      <h5 class="title">
        <span>推荐MV</span>
        <span class="loadMore">更多 <i class="icon-right"></i></span>
      </h5>
      <ul class="list">
        <li class="item" v-for="item in mvList">
          <div class="copywriter">{{item.copywriter}}</div>
          <div class="icon" @click="selectMv(item)">
            <img class="avatar" v-lazy="item.picUrl">
            <div class="playCount"><span class="icon-play"></span> {{item.playCount | numToWan}}</div>
          </div>
          <div class="name">
            <div class="">{{item.name}}</div>
            <div class="singer">
              <span v-for="artist in item.artists" @click="selectArtist(artist)">{{artist.name}} </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="channel dj">
      <h5 class="title">
        <span>主播电台</span>
        <span class="loadMore">更多 <i class="icon-right"></i></span>
      </h5>
      <ul class="list">
        <li class="item" v-for="(item,index) in djList" @click="selectDJ(item,index)">
          <div class="icon">
            <img class="avatar" v-lazy="item.image">
            <span class="icon-play"></span>
          </div>
          <div class="name">
            <div class="text">{{item.name}}</div>
            <div class="desc">
              {{item.album}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Carousel from 'base/carousel/carousel'
  import CarouselItem from 'base/carousel-item/carousel-item'
  import Loading from 'base/aniPlaying/aniPlaying'
  import {CODE} from 'api/config'
  import {getBanner, getPersonalized, getPrivateContent, getNewSong, getPersonalizedMV, getDJ} from 'api/index'
  import {getSongURL} from 'api/detail'
  import {getMVInfo} from 'api/mv'
  import {createNewSong, createDJ} from 'common/js/song'
  import {mapGetters,mapMutations, mapActions} from 'vuex'
  export default {
    name: 'recommend',
    data() {
      return {
        title: "个性推荐",
        banner: [],
        personalizedList: [],//推荐歌单
        privateContentList: [],
        newSongList: [],
        mvList: [],
        djList: [],

      }
    },
    computed: {
      ...mapGetters([
        'currentSong',
      ]),
    },
    created () {
      this._getBanner()
      this._getPersonalized()
      this._getPrivateContent()
      this._getNewSong()
      this._getPersonalizedMV()
      this._getDJ()
    },
    methods: {
      _getBanner(){
        getBanner().then(res => {
          if (res.code === CODE) {
            this.banner = res.banners
            console.log(this.banner)
          }
        })
      },
      _getPersonalized(){
        getPersonalized().then(res => {
          if (res.code === CODE) {
            this.personalizedList = res.result
          }
        })
      },
      _getPrivateContent(){
        getPrivateContent().then(res => {
          if (res.code === CODE) {
            this.privateContentList = res.result
          }
        })
      },
      _getNewSong(){
        getNewSong().then(res => {
          if (res.code === CODE) {
            this.newSongList = this._normalizeSongs(res.result)
            this.newSongList.forEach(song => {
              getSongURL(song.id).then(res => {
                if (res.code === CODE) {
                  song.url = res.data[0].url
                }
              })
            })
            console.log(this.newSongList)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createNewSong(musicData.song))
          }
        })
        return ret
      },
      _getPersonalizedMV(){
        getPersonalizedMV().then(res => {
          if (res.code === CODE) {
            this.mvList = res.result
            console.log(this.mvList)
          }
        })
      },
      _getDJ(){
        getDJ().then(res => {
          if (res.code === CODE) {
            this.djList = this._normalizeDJ(res.result)
            this.djList.forEach(song => {
              getSongURL(song.id).then(res => {
                if (res.code === CODE) {
                  song.url = res.data[0].url
                }
              })
            })
            console.log(this.djList)
          }
        })
      },
      _normalizeDJ(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createDJ(musicData.program.mainSong))
          }
        })
        return ret
      },
      selectSong(item, index){
        //设置播放列表
        this.selectPlay({
          list: this.newSongList,
          index
        })
      },
      selectMv(item){
        /*getMVInfo(item.id).then(res => {
          if (res.code === CODE) {
            console.log(res.data.brs)
            item.url=res.data.brs
            this.setMV(item)
          }
        })*/
        this.$router.push({path: '/mvDetail', query: {mvid: item.id}})
      },
      selectDJ(item, index){
        this.selectPlay({
          list: this.djList,
          index
        })
      },
      selectArtist(item){
        this.$router.push({path: '/home/singer/'+item.id})
      },
      ...mapActions([
        'selectPlay'
      ]),
      ...mapMutations({
        setMV: 'SET_MV',
      }),
    },
    components: {
      Loading,
      Carousel,
      CarouselItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .recommend
    max-width 1200px
    margin auto
    .carousel-wrapper
      margin 20px auto 0
      img
        position absolute
        left 0
        bottom 0
        width 100%
        display block
      .title
        position absolute
        right 0
        bottom 10px
        height 20px
        display flex
        align-items center
        padding 0 8px
        border-radius 10px 0 0 10px
        color #fff
        font-size 12px
    .channel
      margin-top 20px
      .title
        display flex
        justify-content space-between
        line-height 40px
        background #fff
        position sticky
        top 0
        z-index 1
        .loadMore
          color $color-text-d
      .list
        display flex
        justify-content space-between
        .item
          position relative
          width 16%
          overflow hidden
          cursor pointer
          &:hover
            .copywriter
              transform translateY(0)
          .copywriter
            position absolute
            left 0
            top 0
            right 0
            z-index 1
            background rgba(0, 0, 0, .4)
            color #fff
            font-size 13px
            line-height 18px
            padding 10px
            transform translateY(-100%)
            transition all .3s
          .icon
            position relative
            .playCount
              position absolute
              left 0
              bottom 0
              right 0
              line-height 20px
              padding-left 5px
              background-image linear-gradient(90deg, rgba(0, 0, 0, .5), transparent)
              color $color-background-ll
              font-size 12px
            .avatar
              width 100%
              display block
          .name
            flex 1
            _height 50px
            line-height 22px
            .singer, .desc
              color #999
              font-size 12px
              .label
                display inline-block
                line-height 12px
                padding 1px 2px
                border-radius 2px
                border 1px solid $color-theme
                color $color-theme
                transform scale(.7)
      &.private
        .item
          width 32.8%
      &.newSong
        .list
          flex-wrap wrap
          .item
            width 50%
            display flex
            align-items center
            padding 10px 0
            box-sizing border-box
            .num
              width 40px
              text-align center
            .icon
              width 50px
              margin-right 10px
              .icon-play
                position absolute
                left 50%
                top 50%
                transform translate(-50%, -50%)
                padding 5px
                border 1px solid #fff
                border-radius 50%
                font-size 12px
                color #fff
                opacity .85
            &:nth-child(1), &:nth-child(4), &:nth-child(5), &:nth-child(8), &:nth-child(9)
              background: #f5f5f7
      &.mv
        .item
          width 24.5%
      &.dj
        .list
          flex-wrap wrap
          .item
            width 33%
            display flex
            align-items center
            padding 10px 0
            box-sizing border-box
            .icon
              width 100px
              margin-right 10px
              .icon-play
                position absolute
                right 10px
                bottom 10px
                padding 5px
                border 1px solid #fff
                border-radius 50%
                font-size 12px
                color #fff
                opacity .85
</style>
