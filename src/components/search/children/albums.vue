<template>
  <div class="albums">
    <table class="table">
      <thead>
      <tr>
        <th></th>
        <th>专辑（{{albumCount}}）</th>
        <th>发布时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in albums" :key="index">
        <td class="num">
          <span v-if="index<9">0{{index+1}}</span>
          <span v-else>{{index+1}}</span>
        </td>
        <td>
          <img v-lazy="item.picUrl" class="avatar">{{item.name}}
        </td>
        <td class="name">{{item.publishTime | getLocalTime}}</td>
      </tr>
      </tbody>
    </table>
    <button :disable="disable" class="loadMore-text" @click="loadMore" v-show="hasMore">加载更多</button>
  </div>
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
        albums: [],
        albumCount:'',
        limit: 30,
        offset: 0,
        type: 10,
        hasMore:true,
        disable: false,
      }
    },
    computed: {
      ...mapGetters([
        'keyword'
      ])
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.keyword == '') {
          vm.$router.push({path: '/'})
          return
        }
        if(vm.albums.length<1){
          search(vm.keyword, vm.limit, vm.offset, vm.type).then(res => {
            if (res.code === CODE) {
              vm.albums = res.result.albums
              vm.albumCount = res.result.albumCount
              console.log(vm.albums)
            }
          })
        }
      })
    },
    methods: {
      selectAlbum(item){
        this.$router.push({path: '/home/singer/'+item.id})
      },
      loadMore(){
        if(this.hasMore){
          this.disable = true
          this.offset+=this.limit
          search(this.keyword, this.limit, this.offset, this.type).then(res => {
            this.disable = false
            if (res.code === CODE) {
              this.albums = this.albums.concat(res.result.albums)
              //console.log(this.albums)
            }
            if(this.albums.length>=this.albumCount){
              this.hasMore=false
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
