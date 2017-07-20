<template>
  <section class="detail" v-if="recommendSongs.length">
    <div class="tab">
      <div class="tab-header">
        <div class="avatar">
          <div class="week">{{week}}</div>
          <div class="date">{{date}}</div>
        </div>
        <div class="info">
          <h1 class="title">每日歌曲推荐</h1>
          <div class="desc">根据您的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <div class="tab-body">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>操作</th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>推荐理由</th>
            <th>时长</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in recommendSongs" :key="index" @click="selectSong(item.id)">
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
              <span v-for="artist in item.artists">{{artist.name}}</span>
            </td>
            <td class="reason">{{item.reason}}</td>
            <td class="during">{{item.duration}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getRecommendSongs} from 'api/index'
  import {mapGetters} from 'vuex'
  export default {
    name: 'day-detail',
    data() {
      return {
        title: "每日歌曲推荐",
        recommendSongs: []
      }
    },
    created () {
      if (this.userInfo) {
        getRecommendSongs().then(res => {
          if (res.code === CODE) {
            this.recommendSongs = res.recommend
            console.log(this.recommendSongs)
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      week(){
        let str = "星期";
        let week = new Date().getDay();
        switch (week) {
          case 0 :
            str += "日";
            break;
          case 1 :
            str += "一";
            break;
          case 2 :
            str += "二";
            break;
          case 3 :
            str += "三";
            break;
          case 4 :
            str += "四";
            break;
          case 5 :
            str += "五";
            break;
          case 6 :
            str += "六";
            break;
        }
        return str
      },
      date(){
        let str = "";
        let myDate = new Date()
        str = myDate.getDate()
        return str
      }
    },
    methods: {
      selectSong(id){
        console.log(id)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .detail
    position absolute
    left 250px
    right 0
    top 50px
    bottom 50px
    overflow auto
    .tab
      .tab-header
        padding 20px
        display flex
        .avatar
          width 100px
          height 100px
          text-align center
          border 1px solid #eee
          margin-right 20px
          background #f3f5f9
          .date
            font-size 50px
            font-weight 700px
            color $color-theme
          .week
            font-size 15px
            color #666
            margin: 15px 0
        .info
          flex 1
          display flex
          flex-direction column
          justify-content center
          .title
            font-size 22px
            margin-bottom 15px
          .desc
            font-size 12px
            color #999
      .tab-body
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
