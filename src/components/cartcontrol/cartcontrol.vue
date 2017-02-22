<template>
  <div class="cartcontrol -wrap">
    <transition name="fade">
      <div class="icon-container" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline" @click="remove"></span>
      </div>
    </transition>
    <span class="count" v-show="food.count>0">{{food.count}}</span>
    <span class="icon-add_circle" @click="add"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import bus from 'common/js/bus'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      /**
       * 数量减
       * */
      remove(event) {
        if (!event._constructed) {
          return
        }
        this.food.count && this.food.count--
      },
      /**
       * 数量加
       * */
      add(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1) // 为一定对象增加自定义字段时设置方法，这样其它引用的地方才会被监听到
        } else {
          this.food.count++
        }
        // 派发事件，让父组件监听到
        bus.$emit('cart.add', event.target)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .icon-remove_circle_outline, .icon-add_circle
      display:inline-block
      line-height:24px
      font-size:24px
      color:rgb(0, 160, 220)
      padding:6px
    .icon-container
      &.fade-enter-active, &.fade-leave-active
        transition:all .4s linear
        transform:translate3d(0, 0, 0)
        opacity:1
        .inner
          transition:all .4s linear
          transform:rotate(0)
      &.fade-enter, &.fade-leave
        transition:all .4s linear
        transform:translate3d(24px, 0, 0)
        opacity:0
        .inner
          transition:all .4s linear
          transform:rotate(180deg)
    .count
      display:inline-block
      width:12px
      font-size:10px
      line-height:36px
      vertical-align:top
      text-align:center
      color:rgb(147, 153, 159)
</style>
