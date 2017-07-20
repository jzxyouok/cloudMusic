<template>
  <li class="song-item" @click="selectItem(item)">
    <div class="pic-wrap">
      <img v-lazy="item.picUrl" class="song-pic">
    </div>
    <div class="desc">{{item.songListDesc}}</div>
    <div class="name">{{item.songListAuthor}}</div>
  </li>
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
      item:{
        type:Object
      }
    },
    methods:{
      selectItem(item){
        this.$emit('select',item)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .song-item
    position relative
    width 32%
    margin-bottom .05rem
    .pic-wrap
      position relative
      padding-top 100%
      margin-bottom .02rem
      .song-pic
        position absolute
        left 0
        top 0
        width 100%
        display block
        -webkit-box-reflect below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(80%, transparent), to(hsla(0, 0%, 98%, .2)))
    .desc
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      line-height 1.2
    .name
      font-size 12px
      line-height 2
      opacity .5
</style>
