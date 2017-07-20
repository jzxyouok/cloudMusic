<template>
  <section class="new">
    <div class="switches-wrapper">
      <switches :switches="switches"></switches>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getNewAlbum} from 'api/album'
  import Switches from 'base/switches/switches'
  export default {
    name: 'new',
    data() {
      return {
        title: "最新音乐",
        switches: [
          {
            name: '最新音乐'
          },
          {
            name: '新碟上架'
          }
        ],
        limit:50,
        offset:0,
        newAlbums:[],
        newSongs:[]
      }
    },
    components:{
      Switches
    },
    created () {
      this._getNewAlbum(this.limit,this.offset)
    },
    methods: {
      _getNewAlbum(limit,offset){
        getNewAlbum(limit,offset).then(res=>{
          this.newAlbums=res
          console.log(res)
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .new
    .switches-wrapper
      margin 20px auto
</style>
