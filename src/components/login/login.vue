<template>
  <transition name="slide">
    <section class="login">
      <span class="icon-close" @click="close"></span>
      <form class="form">
        <div class="form-item">
          <input type="tel" placeholder="请输入手机号" maxlength="11" class="input username" v-model="phoneNumber">
        </div>
        <div class="form-item">
          <input type="password" placeholder="请输入密码" minlength="6" class="input password" v-model="password">
        </div>
        <div class="submit" @click="login">登录</div>
      </form>
    </section>
  </transition>
</template>

<script>
  import {CODE} from 'api/config'
  import {checkLogin} from 'api/login'
  import {mapMutations} from 'vuex'
  import {setStore} from 'common/js/common'
  export default {
    name: 'login',
    data() {
      return {
        title: "登录",
        phoneNumber:'',
        password:'',
      }
    },
    computed: {
      //判断手机号码
      rightPhoneNumber (){
        return /^1\d{10}$/gi.test(this.phoneNumber)
      },
    },
    methods: {
      ...mapMutations({
        setUserInfo:'SET_USER_INFO',
        showLogin: 'SHOW_LOGIN',
      }),
      login(){
        if(this.rightPhoneNumber){
          checkLogin(this.phoneNumber,this.password).then(res=>{
            if (res.code === CODE) {
              this.setUserInfo(res)
              setStore('userInfo',res)
            }
          })
        }
      },
      close(){
        this.showLogin(false)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .login
    width 350px
    height 460px
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    z-index 90
    background #f8f8f8 url("~common/image/loginBg.jpg") no-repeat
    background-position center top
    border 1px solid #eee
    box-shadow 0 0 20px rgba(0,0,0,.5)
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      opacity: 0
      transform translate3d(-50%,-100%,0)
    .icon-close
      position absolute
      right 10px
      top 10px
      font-size 20px
      padding 3px
      cursor pointer
    .form
      margin-top 220px
      .form-item
        position relative
        width 280px
        margin auto
        .input
          width 100%
          height 35px
          text-align center
          border 1px solid #ddd
          &.username
            border-bottom 0
            border-radius 5px 5px 0 0
          &.password
            border-radius 0 0 5px 5px
      .submit
        width 280px
        margin auto
        background #e20000
        color #fff
        text-align center
        line-height 40px
        margin-top 30px
        border-radius 5px
        cursor pointer
</style>
