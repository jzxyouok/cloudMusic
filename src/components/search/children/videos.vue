<template>
  <div class="video">
    <h5 class="title">MV数：{{mvCount}}</h5>
    <card-mv :mvs="mvs" @select="selectMV" @onSelectArtist="selectArtist"></card-mv>
  </div>
</template>

<script>
  import {CODE} from 'api/config'
  import {search} from 'api/index'
  import {createNewSong} from 'common/js/song'
  import {mapGetters} from 'vuex'
  import CardMv from 'base/card-mv/card-mv'
  export default {
    name: 'search',
    data() {
      return {
        title: "搜索单曲",
        mvs: [],
        mvCount:'',
        limit: 30,
        offset: 0,
        type: 1004
      }
    },
    components:{
      CardMv
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
        if(vm.mvs.length<1){
          search(vm.keyword, vm.limit, vm.offset, vm.type).then(res => {
            if (res.code === CODE) {
              vm.mvs = res.result.mvs
              vm.mvCount = res.result.mvCount
              console.log(vm.mvs)
            }
          })
        }
      })
    },
    methods: {
      selectMV(item){
        this.$router.push({path: '/mvDetail',query: {mvid: item.id}})
      },
      selectArtist(item){
        this.$router.push({path: '/home/singer/'+item.id})
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .video
    .title
      padding-bottom 20px
</style>
