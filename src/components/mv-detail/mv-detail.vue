<template>
  <section class="mv-detail">
    <div class="video-wrapper" v-if="mv">
      <video class="video" :src="'/mv/url?url='+mv.brs[240]" :post="mv.cover" autoplay controls width="100%"></video>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getMVInfo} from 'api/mv'
  export default {
    name: 'mv-detail',
    data() {
      return {
        title: "mv详情",
        mv:''
      }
    },
    created () {
      this._getMv(this.$route.query.mvid)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm._getMv(vm.$route.query.mvid)
      })
    },
    methods: {
      _getMv(id){
        getMVInfo(id).then(res => {
          if (res.code === CODE) {
            this.mv = res.data
            console.log(this.mv)
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .mv-detail
    position absolute
    left 250px
    top 50px
    right 0
    bottom 0
    overflow auto
    .video-wrapper
      width 640px
      height 360px
      background #000
      .video
        width 100%
        height 100%
</style>
