<template>
  <table class="table">
    <thead>
    <tr>
      <th></th>
      <th>歌手</th>
      <th>专辑</th>
      <th>MV</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in artists" :key="index" @click="selectArtist(item)">
      <td class="num">
        <span v-if="index<9">0{{index+1}}</span>
        <span v-else>{{index+1}}</span>
      </td>
      <td>
        <img :src="item.picUrl" class="avatar">{{item.name}}
      </td>
      <td class="name">{{item.albumSize}}</td>
      <td class="name">{{item.mvSize}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {CODE} from 'api/config'
  import {search} from 'api/index'
  import {createNewSong} from 'common/js/song'
  import {mapGetters} from 'vuex'
  export default {
    name: 'search',
    data() {
      return {
        title: "搜索单曲",
        artists: [],
        limit: 30,
        offset: 0,
        type: 100
      }
    },
    computed: {
      ...mapGetters([
        'keyword'
      ])
    },
    created () {
      if(this.keyword==''){
        this.$router.push({path:'/'})
        return
      }
      search(this.keyword, this.limit, this.offset, this.type).then(res => {
        if (res.code === CODE) {
          this.artists = res.result.artists
          console.log(this.artists)
        }
      })
    },
    methods: {
      selectArtist(item){
        this.$router.push({path: '/home/singer/'+item.id})
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .table
    width 100%
    text-align left
    color #999
    thead
      color #666
      th
        line-height 32px
    tbody
      tr
        background #fff
        cursor pointer
        &:nth-child(2n+1)
          background #f3f5f9
        &:hover
          background #f3f5f7
        td
          font-size 13px
          line-height 32px
          vertical-align middle
          .avatar
            width 100px
            display inline-block
            vertical-align middle
            margin 10px
          [class^="icon-"], [class*=" icon-"]
            font-size 14px
          &.num
            width 40px
            text-align center
          &.operation
            width 60px
          &.name
            color #111
          &.during
            width 80px
</style>
