<template>
  <ul class="list">
    <li class="item" v-for="(item,index) in mvs" :key="index">
      <div class="avatar" @click="selectItem(item)">
        <img v-lazy="item.cover">
        <div class="duration">{{item.duration | formatDuration}}</div>
        <div class="playCount">{{item.playCount | numToWan}}</div>
      </div>
      <div class="name">
        {{item.name}}
      </div>
      <div class="artistName">
        <span v-for="artist in item.artists" @click="selectArtist(artist)">{{artist.name}} </span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'card',
    data() {
      return {
        title: "card",
      }
    },
    props:{
      mvs:{
        type:Array,
        default:[]
      }
    },
    methods:{
      selectItem(item){
        this.$emit('select',item)
      },
      selectArtist(artist){
        this.$emit('onSelectArtist',artist)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
      .artistName
        line-height 20px
        font-size 12px
        color #999
</style>
