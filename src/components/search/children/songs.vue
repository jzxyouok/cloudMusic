<template>
  <div class="songs">
    <table class="table">
      <thead>
      <tr>
        <th></th>
        <th>操作</th>
        <th>歌曲（{{songCount}}）</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in songs" :key="index" @click="selectSong(item,index)">
        <td class="num">
          <span v-if="index<9">0{{index+1}}</span>
          <span v-else>{{index+1}}</span>
        </td>
        <td class="operation">
          <span class="icon-love"></span>
          <span class="icon-download"></span>
        </td>
        <td class="name">{{item.name}}</td>
        <td class="singer">
          {{item.singer}}
        </td>
        <td class="album">{{item.album}}</td>
        <td class="during">{{item.duration}}</td>
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
  import {getSongURL} from 'api/detail'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'search',
    data() {
      return {
        title: "搜索单曲",
        songs: [],
        songCount: '',
        limit: 30,
        offset: 0,
        type: 1,
        hasMore: true,
        disable: false,
      }
    },
    computed: {
      ...mapGetters([
        'keyword'
      ])
    },
    created () {
      if (this.keyword !== '') {
        this._searchSongs(this.keyword, this.limit, this.offset, this.type)
      } else {
        this.$router.push({path: '/'})
      }
    },
    watch: {
      keyword(newKeyword){
        if (newKeyword !== '') {
          this._searchSongs(newKeyword, this.limit, this.offset, this.type)
        } else {
          this.$router.push({path: '/'})
        }
      }
    },
    methods: {
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ]),
      _searchSongs(keyword, limit, offset, type){
        search(keyword, limit, offset, type).then(res => {
          if (res.code === CODE) {
            this.songs = this._normalizeSongs(res.result.songs)
            this.songCount = res.result.songCount
            this.songs.forEach(song => {
              getSongURL(song.id).then(res => {
                if (res.code === CODE) {
                  song.url = res.data[0].url
                }
              })
            })
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id) {
            ret.push(createNewSong(musicData))
          }
        })
        return ret
      },
      loadMore(){
        if (this.hasMore) {
          this.disable = true
          this.offset += this.limit
          search(this.keyword, this.limit, this.offset, this.type).then(res => {
              this.disable = false
              if (res.code === CODE) {
                this.songs = this.songs.concat(this._normalizeSongs(res.result.songs))
                this.songCount = res.result.songCount
                this.songs.forEach(song => {
                  getSongURL(song.id).then(res => {
                    if (res.code === CODE) {
                      song.url = res.data[0].url
                    }
                  })
                })
                console.log(this.songs)
              }
              if (this.songs.length >= this.songCount) {
                this.hasMore = false
              }
            })
            .catch(error => {
              this.disable = false
            })
        }
      },
      selectSong(item, index){
        //设置播放列表
        this.selectPlay({
          list: this.songs,
          index
        })
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
