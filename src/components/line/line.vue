<template>
  <!--分隔线-->
  <div class="line-box border-1px">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .line-box
    display:flex
    .line
      flex:1
      position:relative
      top:-7px
      border-1px(rgba(255, 255, 255, .2))
    .text
      padding:0 12px
      font-size:14px
      font-weight:700
</style>
