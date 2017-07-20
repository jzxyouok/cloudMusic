<template>
  <section class="relate">
    <ul class="list">
      <li class="item" v-for="item in artists" @click="selectArtist(item)">
        <img v-lazy="item.picUrl" class="avatar">
        <div class="name">{{item.name}}</div>
      </li>
    </ul>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getSimiArtists} from 'api/singer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'relate',
    data() {
      return {
        title: "相似歌手",
        artists:[]
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.$route.params.id) {
          vm.$router.push('/home/singer')
          return
        }
        vm._getSimiArtists(vm.$route.params.id)
      })
    },
    methods: {
      _getSimiArtists(id){
        getSimiArtists(id).then(res => {
          if (res.code === CODE) {
            this.artists = res.artists
            console.log(this.artists)
          }
        })
      },
      selectArtist(item){
        this.$router.push({path: '/home/singer/'+item.id})
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .relate
    .list
      display flex
      flex-wrap wrap
      .item
        width 140px
        margin-right 20px
        margin-bottom 10px
        .avatar
          width 100%
          display block
          border 1px solid #eee
        .name
          text-align center
          line-height 22px
</style>
