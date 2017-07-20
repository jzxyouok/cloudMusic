<template>
  <div class="ani_playing">
    <div :class="{'playStatePaused':!playing}" v-for="i in 4"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'aniPlaying',
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'playing'
      ])
    },
  }
</script>
<style scoped>
  .ani_playing > .playStatePaused {
    animation-play-state: paused;
  }

  .ani_playing {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 12px;
    overflow: hidden;
    transform-style: preserve-3d;
    display: flex;
  }

  .ani_playing > div {
    height: 12px;
    width: 2px;
    margin-right: 2px;
    background-color: #c52f30;
    -webkit-animation: bounce ease-in-out infinite alternate forwards;
  }

  .ani_playing > div:nth-of-type(1) {
    animation-duration: .4s;
  }

  .ani_playing > div:nth-of-type(2) {
    animation-duration: .6s;
  }

  .ani_playing > div:nth-of-type(3) {
    animation-duration: .7s;
  }

  .ani_playing > div:nth-of-type(4) {
    animation-duration: .5s;
  }

  @keyframes bounce {
    0% {
      -webkit-transform: translate3d(0, 12px, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
    }
  }
</style>
