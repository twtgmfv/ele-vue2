<template>
  <div class="header">
    <!--Begin 商家信息-->
    <div class="content-wrap">
      <img class="avatar" :src="seller.avatar" alt="">
      <div class="content ml-16">
        <!--标题-->
        <h1 class="title">
          <span class="icon-brand"></span><span class="name">{{seller.name}}</span>
        </h1>
        <!--描述-->
        <div class="description fs-12 mt-8">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <!--支持-->
        <div v-if="seller.supports" class="supports mt-10">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span><span class="text fs-10">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--End 商家信息-->
    <!--Begin 公告-->
    <div class="bulletin-wrap  text-ellipsis" @click="showDetail">
      <span class="icon-bulletin"></span><span class="text fs-10">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--End 公告-->
    <!--Begin 背景图片-->
    <div class="bg">
      <img class="bg-img" :src="seller.avatar" alt="">
    </div>
    <!--End 背景图片-->
    <!--Begin 详情弹窗-->
    <transition name="fade">
      <div class="modal-detail" v-show="modalShow">
        <div class="modal-box">
          <div class="modal-content">
            <!--商家名称-->
            <h1 class="title">{{seller.name}}</h1>
            <!--星等级-->
            <star class="star" :size="48" :score="4.6"></star>
            <!--分隔线-->
            <v-line :text=" '优惠信息' "></v-line>
            <!--优惠列表-->
            <ul class="list supports">
              <li v-for="support in seller.supports" class="text-ellipsis">
                <span class="icon" :class="classMap[support.type]"></span>{{support.description}}
              </li>
            </ul>
            <!--分隔线-->
            <v-line :text=" '商家公告' " class="line-seller"></v-line>
            <!--商家公告-->
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="modal-footer" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    <!--End 详情弹窗-->
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import line from 'components/line/line'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        modalShow: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.global.query('test')
    },
    methods: {
      showDetail() {
        this.modalShow = true
      },
      closeDetail() {
        this.modalShow = false
      }
    },
    components: {
      'v-line': line,
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .header
    position:relative
    color:#FFF
    background:rgba(7, 17, 27, .5)
    overflow:hidden
    .content-wrap
      position:relative
      padding:24px 12px 18px 24px
      .avatar
        width:64px
        height:64px
        border-radius:2px
      .content
        display:inline-block
        margin-top:2px
        vertical-align:top
        .title
          .icon-brand
            width:30px
            height:18px
            vertical-align:top
            margin-right:6px
            bg-image('brand')
            background-size:30px 18px
          .name
            line-height:18px
            margin-top:2px
            font-weight:700

      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:25px
        border-radius:14px
        background:rgba(0, 0, 0, 0.2)
        text-align:center
        .count
          vertical-align:top
          font-size:10px
        .icon-keyboard_arrow_right
          margin-left:2px
          line-height:24px
          font-size:10px
    .bulletin-wrap
      height:28px
      line-height:29px
      padding:0 25px 0 12px
      background:rgba(7, 17, 27, .2)
      font-size:10px
      .icon-bulletin
        width:22px
        height:12px
        vertical-align:middle
        margin-right:4px
        bg-image('bulletin')
        background-size:22px 12px
      .icon-keyboard_arrow_right
        position:absolute
        bottom:9px
        right:12px
    .bg
      position:absolute
      width:100%
      height:100%
      top:0
      left:0
      z-index:-1
      .bg-img
        width:100%
        height:100%
        filter:blur(10px)
    .modal-detail
      position:fixed
      z-index:1000
      width:100%
      height:100%
      top:0
      left:0
      overflow:auto
      background:rgba(7, 17, 27, .8)
      backdrop-filter:blur(10px)
      .modal-box
        min-height:100%
        .line-seller
          margin:28px 0 24px
        .modal-content
          padding:64px 36px
          .title
            font-size:16px
            line-height:16px
            margin:0 auto 16px auto
            font-weight:700
            text-align:center
          .star
            text-align:center
            margin-bottom:28px
          p
            font-size:12px
            line-height:24px
            padding:0 12px
            text-align:justify
      .modal-footer
        width:32px
        height:32px
        margin:-64px auto 0 auto
        font-size:32px
        color:rgba(255, 255, 255, .5)
  .list
    margin-top:24px
    padding:0 12px
    li
      margin-bottom:12px
      line-height:12px
      font-size:12px
      &:last-child
        margin-bottom:0
      .icon
        margin-right:6px

.supports
  .text
    line-height:13px
  .icon
    width:12px
    height:12px
    margin-right:4px
    background-size:12px 12px
    vertical-align:top
    &.decrease
      bg-image('decrease_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')
    &.discount
      bg-image('discount_1')



</style>
