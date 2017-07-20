<template>
  <section class="profile">profile</section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getUserSongList} from 'api/login'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'profile',
    data() {
      return {
        title: "个人中心",
        songList:[]
      }
    },
    created () {
      this._getUserSongList(this.userInfo.account.id)
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      _getUserSongList(uid){
        getUserSongList(uid).then(res => {
          if(res.code===CODE){
            this.songList=res.playlist
            console.log(this.songList)
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .profile
    position absolute
    left 250px
    right 0
    top 50px
    bottom 50px
    overflow auto
    background #fff
</style>
