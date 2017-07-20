<template>
  <transition name="fade">
    <section class="toast" v-show="showFlag">
      {{text | calcMode}}
    </section>
  </transition>
</template>

<script>
  export default {
    name: 'toast',
    data(){
      return {
        showFlag: false
      }
    },
    props: {
      text: {
        type: [String,Number]
      }
    },
    methods: {
      show(){
        this.showFlag = true
        setTimeout(() => {
          this.showFlag = false
        }, 1000)
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .toast
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    z-index: 1010
    background: rgba(0, 0, 0, .75)
    color: $color-text
    padding: .1rem .2rem
    border-radius: .05rem
  .fade-enter-active
  .fade-leave-active
    transition: opacity .3s
  .fade-enter
  .fade-leave-active
    opacity: 0
</style>
