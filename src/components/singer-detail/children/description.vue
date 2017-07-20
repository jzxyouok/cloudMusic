<template>
  <section class="description">
    <div class="desc">
      <dl class="briefDesc">
        <dt class="title">简介</dt>
        <dd class="item">{{desc.briefDesc}}</dd>
      </dl>
      <dl class="introduction" v-for="item in desc.introduction">
        <dt class="title" v-text="item.ti"></dt>
        <dd class="item">
          <p v-for="t in item.txt">{{t}}</p>
        </dd>
      </dl>
      <dl class="topicData" v-for="item in desc.topicData">
        <dt class="title">{{item.mainTitle}}</dt>
        <dd class="item">{{item.recmdContent}}</dd>
      </dl>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getArtistDesc} from 'api/singer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'description',
    data() {
      return {
        title: "歌手描述",
        desc: ''
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
        vm._getArtistDesc(vm.$route.params.id)
      })
    },
    methods: {
      _getArtistDesc(id){
        getArtistDesc(id).then(res => {
          if (res.code === CODE) {
            this.desc = res
            this.desc.introduction.forEach(item => {
              return item.txt = item.txt.split('；')
            })
            console.log(this.desc)
          }
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .desc
    dl
      margin-bottom 20px
      .title
        font-size 16px
        font-weight 600%
        margin-bottom 10px
      .item
        color #666
        line-height 22px
        text-indent 2em
</style>
