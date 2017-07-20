<template>
  <div class="wrapper">
    <div class="drag" id="target" @mousedown="onMouseDown" @mousemove="move" @mouseup="end">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data(){
      return{
        startX:0,
        startY:0,
        sourceX:0,
        sourceY:0,
      }
    },
    props:{
      text:{
        type:String,
        default:''
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      // 获取当前浏览器支持的transform兼容写法
      getTransform() {
        var transform = '',
          divStyle = document.createElement('div').style,
          // 可能涉及到的几种兼容性写法，通过循环找出浏览器识别的那一个
          transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
          i = 0,
          len = transformArr.length;

        for (; i < len; i++) {
          if (transformArr[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = transformArr[i];
          }
        }
        // 如果没有找到，就直接返回空字符串
        return transform;
      },
      //获取元素属性
      getStyle(elem, property) {
        // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
        return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] : elem.currentStyle[property];
      },
      //获取元素初始位置
      getTargetPos(elem) {
        var pos = {x: 0, y: 0};
        var transform = this.getTransform();
        if (transform) {
          var transformValue = this.getStyle(elem, transform);
          if (transformValue == 'none') {
            elem.style[transform] = 'translate(0, 0)';
            return pos;
          } else {
            var temp = transformValue.match(/-?\d+/g);
            return pos = {
              x: parseInt(temp[4].trim()),
              y: parseInt(temp[5].trim())
            }
          }
        } else {
          if (this.getStyle(elem, 'position') == 'static') {
            elem.style.position = 'relative';
            return pos;
          } else {
            var x = parseInt(this.getStyle(elem, 'left') ? this.getStyle(elem, 'left') : 0);
            var y = parseInt(this.getStyle(elem, 'top') ? this.getStyle(elem, 'top') : 0);
            return pos = {
              x: x,
              y: y
            }
          }
        }
      },
      //设置目标元素位置
      setTargetPos(elem, pos) {
        var transform = this.getTransform();
        if (transform) {
          elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
        } else {
          elem.style.left = pos.x + 'px';
          elem.style.top = pos.y + 'px';
        }
        return elem;
      },
      onMouseDown(event){
        this.touch.initiated = true
        // 获取目标元素对象
        let oElem = document.getElementById('target');
        // 获取鼠标初始位置
        this.startX = event.pageX;
        this.startY = event.pageY;

        // 获取元素初始位置
        let pos = this.getTargetPos(oElem);

        this.sourceX = pos.x;
        this.sourceY = pos.y;
      },
      move(event) {
        if (!this.touch.initiated) {
          return
        }
        let oElem = document.getElementById('target')
        // 获取鼠标当前位置
        let currentX = event.pageX
        let currentY = event.pageY

        // 计算差值
        let distanceX = currentX - this.startX
        let distanceY = currentY - this.startY

        // 计算并设置元素当前位置
        this.setTargetPos(oElem, {
          x: (this.sourceX + distanceX).toFixed(),
          y: (this.sourceY + distanceY).toFixed()
        })
      },
      end() {
        this.touch.initiated = false
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    position absolute
    left 50px
    bottom 50px
    z-index 999
    right 50px
    text-align center
    .drag
      display inline-block
      font-size .1rem
      padding 10px 30px
      color #fff
      text-shadow 1px 1px 5px #c52f30, 1px -1px 3px #c52f30
      cursor move
</style>
