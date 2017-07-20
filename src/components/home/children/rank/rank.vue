<template>
  <section class="rank">
    <div class="channel">
      <ul class="list">
        <router-link tag="li" :to="'/songListDetail?id='+item.id" class="item" v-for="(item,index) in cates" :key="index">
          <div class="icon">
            <img v-lazy="item.picUrl" class="avatar">
          </div>
          <div class="name">{{item.title}}</div>
        </router-link>
      </ul>
    </div>
    <div class="card-wrwapper">
      <div class="card">
        <header class="title">
          <img src="./img/rank3_bg.jpg">
        </header>
        <ul class="list">
          <li class="item" v-for="(item,index) in rankList3">
            <div class="num">
              <span class="sequence" :class="{'red':index<3}">{{index+1}}</span>
              <small class="ratio">{{item.ratio}}%</small>
            </div>
            <div class="name">{{item.name}}<small class="alias" v-if="item.alias.length>0">{{item.alias | normalAlias}}</small></div>
            <div class="artist">
              <span v-for="artist in item.artists">{{artist.name}}</span>
            </div>
          </li>
        </ul>
        <footer class="footer">
          查看全部 <span class="icon-right"></span>
        </footer>
      </div>
      <div class="card">
        <header class="title">
          <img src="./img/rank0_bg.jpg">
        </header>
        <ul class="list">
          <li class="item" v-for="(item,index) in rankList0">
            <div class="num">
              <span class="sequence" :class="{'red':index<3}">{{index+1}}</span>
              <small class="lastRank" v-if="item.lastRank!==undefined">↓</small>
              <small class="new" v-else>new</small>
            </div>
            <div class="name">{{item.name}}<small class="alias" v-if="item.alias.length>0">{{item.alias | normalAlias}}</small></div>
            <div class="artist">
              <span v-for="artist in item.artists">{{artist.name}}</span>
            </div>
          </li>
        </ul>
        <footer class="footer">
          查看全部 <span class="icon-right"></span>
        </footer>
      </div>
      <div class="card">
        <header class="title">
          <img src="./img/rank2_bg.jpg">
        </header>
        <ul class="list">
          <li class="item" v-for="(item,index) in rankList2">
            <div class="num">
              <span class="sequence" :class="{'red':index<3}">{{index+1}}</span>
              <small class="lastRank" v-if="item.lastRank!==undefined">↓</small>
              <small class="new" v-else>new</small>
            </div>
            <div class="name">{{item.name}}<small class="alias" v-if="item.alias.length>0">{{item.alias | normalAlias}}</small></div>
            <div class="artist">
              <span v-for="artist in item.artists">{{artist.name}}</span>
            </div>
          </li>
        </ul>
        <footer class="footer">
          查看全部 <span class="icon-right"></span>
        </footer>
      </div>
      <div class="card">
        <header class="title">
          <img src="./img/rank1_bg.jpg">
        </header>
        <ul class="list">
          <li class="item" v-for="(item,index) in rankList1">
            <div class="num">
              <span class="sequence" :class="{'red':index<3}">{{index+1}}</span>
              <small class="lastRank" v-if="item.lastRank!==undefined">↓</small>
              <small class="new" v-else>new</small>
            </div>
            <div class="name">{{item.name}}<small class="alias" v-if="item.alias.length>0">{{item.alias | normalAlias}}</small></div>
            <div class="artist">
              <span v-for="artist in item.artists">{{artist.name}}</span>
            </div>
          </li>
        </ul>
        <footer class="footer">
          查看全部 <span class="icon-right"></span>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
  import {CODE} from 'api/config'
  import {getRank} from 'api/rank'
  export default {
    name: 'rank',
    data() {
      return {
        title: "排行榜",
        rank3: null,
        rankList3: [],
        rank2: null,
        rankList2: [],
        rank1: null,
        rankList1: [],
        rank0: null,
        rankList0: [],
        cates: [
          {
            title: '云音乐飙升榜',
            picUrl: 'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=400y400'
          },
          {
            title: '云音乐新歌榜',
            picUrl: 'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=400y400'
          },
          {
            title: '网易原创歌曲榜',
            picUrl: 'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=400y400'
          },
          {
            title: '云音乐热歌榜',
            picUrl: 'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=400y400'
          },
          {
            title: '云音乐电音榜',
            picUrl: 'http://p1.music.126.net/4mh2HWH-bd5sRufQb-61bg==/3302932937414659.jpg?param=400y400'
          },
          {
            title: 'Beatport全球电子舞曲榜',
            picUrl: 'http://p1.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=400y400'
          },
          {
            title: '云音乐ACG音乐榜',
            picUrl: 'http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=400y400'
          },
          {
            title: '日本Oricon周榜',
            picUrl: 'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=400y400'
          },
          {
            title: '云音乐古典音乐榜',
            picUrl: 'http://p1.music.126.net/BzSxoj6O1LQPlFceDn-LKw==/18681802069355169.jpg?param=400y400'
          },
          {
            title: 'UK排行榜周榜',
            picUrl: 'http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=400y400'
          },


          {
            title: '美国Billboard周榜',
            picUrl: 'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=400y400'
          },
          {
            title: '法国 NRJ Vos Hits 周榜',
            picUrl: 'http://p1.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=400y400'
          },
          {
            title: 'iTunes榜',
            picUrl: 'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=400y400'
          },
          {
            title: 'Hit FM Top榜',
            picUrl: 'http://p1.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=400y400'
          },
          {
            title: '云音乐韩语榜',
            picUrl: 'http://p1.music.126.net/vs-cMh49e6qPEorHuhU07A==/18737877162497499.jpg?param=400y400'
          },
          {
            title: 'KTV唛榜',
            picUrl: 'http://p1.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=400y400'
          },
          {
            title: '台湾Hito排行榜',
            picUrl: 'http://p1.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=400y400'
          },
          {
            title: '中国TOP排行榜（港台榜）',
            picUrl: 'http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=400y400'
          },
          {
            title: '中国TOP排行榜（内地榜）',
            picUrl: 'http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=400y400'
          },
          {
            title: '香港电台中文歌曲龙虎榜',
            picUrl: 'http://p1.music.126.net/YQsr07nkdkOyZrlAkf0SHA==/18976471183805915.jpg?param=400y400'
          },
          {
            title: '中国嘻哈榜',
            picUrl: 'http://p1.music.126.net/ed1DGuS6MOlmNaSkWt32Lw==/19237055439739419.jpg?param=400y400'
          },
        ]
      }
    },
    created () {
      this._getRank(3)
      this._getRank(2)
      this._getRank(1)
      this._getRank(0)
    },
    methods: {
      _getRank(idx){
        getRank(idx).then(res => {
          if (res.code === CODE) {
            if(idx==3){
              this.rank3 = res.result
              this.rankList3 = res.result.tracks.splice(0,12)
              console.log(this.rankList3)
            }
            if(idx==2){
              this.rank2 = res.result
              this.rankList2 = res.result.tracks.splice(0,12)
            }
            if(idx==1){
              this.rank1 = res.result
              this.rankList1 = res.result.tracks.splice(0,12)
            }
            if(idx==0){
              this.rank0 = res.result
              this.rankList0 = res.result.tracks.splice(0,12)
            }
          }
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .rank
    .channel
      margin 20px auto
      .list
        display flex
        justify-content space-between
        flex-wrap wrap
        perspective 400px
        .item
          position relative
          width 16%
          text-align center
          overflow hidden
          cursor pointer
          transform-origin top center
          &:nth-child(n+7)
            transform translateZ(0) rotateX(-10deg)
          &:nth-child(n+13)
            transform translateZ(-25px) rotateX(-30deg)
          &:nth-child(n+19)
            transform translateZ(-90px) rotateX(-40deg)
          &:nth-child(n+25)
            transform translateZ(-200px) rotateX(-50deg)
          .icon
            position relative
            .playCount
              position absolute
              left 0
              top 0
              right 0
              line-height 20px
              padding-right 5px
              background-image linear-gradient(-90deg, rgba(0, 0, 0, .3), transparent)
              color $color-background-ll
              font-size 12px
              text-align right
            .avatar
              width 100%
              display block
              border-radius 5px
          .name
            flex 1
            line-height 32px
            .singer, .desc
              color #999
              font-size 12px
    &:hover
      .channel
        .list
          .item
            transform translateZ(0) rotateX(0)
            transition background .25s,transform .5s cubic-bezier(0.15,1,.3,1.1)
    &:hover .card-wrwapper
      transform none
    &:hover .card-wrwapper
      background #fff
      &:before
        display none
    .card-wrwapper
      position relative
      display flex
      flex-wrap wrap
      justify-content space-between
      background #f3f5f7
      transform translateY(-1.45rem)
      transition transform .25s cubic-bezier(0.15,1,.3,1.1)
      &:before
        display: block
        position: absolute
        content: ""
        pointer-events: none
        left: 0
        right: 0
        bottom: 100%
        height: 180px
        background: linear-gradient(rgba(243, 245, 247,0),#f3f5f7 90%)
        transition: inherit
        transition-timing-function: ease
        transform-origin: center bottom
      .card
        margin 20px 0
        .title
          height 90px
        .footer
          width 330px
          line-height 45px
          text-align right
          padding 0 5px
          background #fff
          color #999
          border 1px solid #f3f5f7
          border-top 0
          box-sizing border-box
        .list
          width 330px
          border 1px solid #eee
          border-top 0
          box-sizing border-box
          .item
            height 35px
            display flex
            align-items center
            padding 0 8px
            font-size 12px
            color #999
            cursor pointer
            &:nth-child(2n)
              background #f3f5f9
            &:nth-child(2n+1)
              background #fff
            .num
              line-height 32px
              .sequence
                font-size 14px
                &.red
                  color $color-theme
                  font-weight 600
              .ratio
                margin 0 5px
              .lastRank
                color #5a58b9
                margin 0 5px
              .new
                color #00af58
                margin 0 5px
            .name
              flex 1
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
              padding-right 15px
              color #333
              .alias
                color #999
            .artist
              color #B7B7B7
</style>
