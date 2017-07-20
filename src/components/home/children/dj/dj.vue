<template>
  <section class="dj">
    <div class="cates">
      <ul class="list">
        <li class="item" :class="{'current':currentIndex==index}" v-for="(item,index) in cateList" @click="selectCate(index,item.id)">
          <div class="icon">
            <img :src="item.picWebUrl" class="img">
          </div>
          <div class="name">{{item.name}}</div>
        </li>
      </ul>
    </div>
    <div class="channel dj">
      <h5 class="title">
        <span>推荐电台</span>
      </h5>
      <ul class="list">
        <li class="item" v-for="item in djList">
          <div class="icon">
            <img class="avatar" v-lazy="item.picUrl">
            <span class="icon-play"></span>
          </div>
          <div class="name">
            <div class="text">{{item.name}}</div>
            <div class="desc">
              {{item.rcmdtext}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getDjCate,getRecommendDj} from 'api/dj'
  import {mapGetters} from 'vuex'
  export default {
    name: 'playlist',
    data() {
      return {
        title: "主播电台",
        currentIndex:0,
        cateList: [],
        djList: []
      }
    },
    created () {
      this._getDjCate()
    },
    methods: {
      _getDjCate(){
        getDjCate().then((res) => {
          this.cateList = res.categories
          this._getRecommendDj(10001)
        })
      },
      _getRecommendDj(type){
        getRecommendDj(type).then(res=>{
          this.djList=res.djRadios
          console.log(this.djList)
        })
      },
      selectCate(index,id){
        this.currentIndex=index
        this._getRecommendDj(id)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .dj
    .cates
      .list
        overflow hidden
        .item
          display inline-block
          width 70px
          margin 20px 10px 0
          text-align center
          overflow hidden
          border-radius 6px
          &.current
            color $color-theme
            .img
              margin-left -48px
          &:hover
            background-color #f3f5f9
            cursor pointer
            color $color-theme
            .img
              margin-left -48px
          .icon
            position relative
            display inline-block
            width: 48px
            height: 48px
            overflow: hidden
            display: inline-block
            .img
              position absolute
              left 0
              top 0
              width 96px
              transition all .2s
          .name
            font-size 12px
            line-height 20px
    .channel
      margin-top 20px
      .title
        display flex
        justify-content space-between
        line-height 40px
        .loadMore
          color $color-text-d
      .list
        display flex
        justify-content space-between
        flex-wrap wrap
        .item
          position relative
          width 19%
          margin-bottom 10px
          overflow hidden
          cursor pointer
          .icon
            position relative
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
            .avatar
              width 100%
              display block
          .name
            flex 1
            _height 50px
            line-height 22px
            .singer,.desc
              color #999
              font-size 12px
</style>
