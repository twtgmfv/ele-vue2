<template>
  <div class="shopcart">
    <div class="cartBar" @click="toggleCartList">
      <div class="content" :class="{'hasFoods':totalCount}">
      <span class="icon-cart">
        <span class="count" v-show="totalCount">{{totalCount}}</span>
        <i class="icon-shopping_cart"></i>
      </span>
        <span class="price">￥{{totalPrice}}</span>
        <span class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div class="minPrice" :class="{'goPay':payDesc==='去结算'}">{{payDesc}}</div>
    </div>
    <div class="cartListBox" ref="cartListBox" :class="{'show':isShowCartList}">
      <ul class="cartList">
        <li class="cartList-item" v-for="food in selectFoods">
          <span class="name">{{food.name}}</span>
          <span class="price">￥{{food.count*food.price}}</span>
          <cartcontrol class="cartControl-box" :food="food"></cartcontrol>
        </li>
      </ul>
      <div class="cartList-header">
        <div class="header-box">
          <span class="title">购物车</span>
          <span class="empty" @click="clearCartList">清空</span>
        </div>
      </div>
    </div>
    <!--动画小球-->
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @enter="enter" @before-enter="beforeEnter" @after-enter="afterEnter">
          <div class="ball drop-enter" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <div class="pageCover" v-show="isShowCartList" :class="{'show':isShowCartList}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from 'common/js/bus'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    props: {
      // 选中的商品
      selectFoods: {
        type: Array // Array OR Object时,default必须是函数
      },
      // 运费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      // 起送价
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        isShowCartList: false
      }
    },
    created() {
      bus.$on('cart.add', (target) => {
        this.drop(target)
      })
    },
    computed: {
      /**
       * 总价
       * */
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      /**
       * 总数量
       * */
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      /**
       * 差价提示
       * */
      payDesc() {
        let minPrice = this.minPrice
        let totalPrice = this.totalPrice
        if (totalPrice <= 0) {
          return `￥${this.minPrice}元起送`
        } else if (totalPrice < minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        } else {
          return `去结算`
        }
      }
    },
    methods: {
      // 初始化scroll
      _initScroll() {
        if (!this.cartListScroll) { // 防止多次实例化
          this.cartListScroll = new BScroll(this.$refs.cartListBox, {
            click: true
          })
        } else {
          this.cartListScroll.refresh()
        }
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true // 触发动画
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 强制屏幕重绘 如果不重绘小球会留在屏幕上
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      /**
       * 显示/隐藏购物车列表
       * */
      toggleCartList() {
        this.isShowCartList = !this.isShowCartList
        this.isShowCartList && // 加载scroll
        this.$nextTick(() => { // 要在列表Dom加载完成后，注册插件
          this._initScroll()
        })
      },
      /**
       * 清空购物车
       * */
      clearCartList() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
        this.isShowCartList = false
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position:fixed
    left:0
    bottom:0
    width:100%
    height:48px
    line-height:48px
    background:#141d27
    color:rgba(255, 255, 255, .4)
    .cartBar
      display:flex
      position:absolute
      bottom:0
      left:0
      width:100%
      z-index:500
      background:rgb(20, 29, 39)
      .content
        flex:1
        position:relative
        padding-left:80px
        font-size:16px
        &.hasFoods
          color:#fff
          .icon-cart
            background:rgb(0, 160, 220)
        .icon-cart
          position:absolute
          bottom:2px
          left:18px
          width:44px
          height:44px
          border:6px solid #141d27
          border-radius:50%
          background:#2B343C
          text-align:center
          line-height:44px
          font-size:24px
          .count
            position:absolute
            top:-5px
            right:-5px
            height:16px
            line-height:16px
            padding:0 6px
            border-radius:16px
            font-size:9px
            font-weight:700
            color:#FFF
            background:rgb(240, 20, 20)
            box-shadow:0 4px 8px 0 rgba(0, 0, 0, .4)
        .price
          font-weight:700
          padding-right:12px
          border-right:1px solid rgba(255, 255, 255, .1)
          margin-right:12px
        .deliveryPrice
          font-size:12px
          vertical-align:top
      .minPrice
        flex:0 0 105px
        box-sizing:border-box
        width:105px
        padding:0 8px
        text-align:center
        font-weight:700
        background:rgb(43, 51, 59)
        &.goPay
          background:rgb(0, 160, 220)
          color:#fff

    .cartListBox

      position:absolute
      top:0
      left:0
      width:100%
      max-height:217px
      overflow:hidden
      background:#fff
      color:#333
      transform:translate3d(0, 0, 0)
      transition:all .5s
      z-index:499
      .cartList
        margin-top:40px
      &.show
        transform:translate3d(0, -100%, 0)
      .cartList-header
        position:absolute
        top:0
        left:9
        width:100%
        .header-box
          height:40px
          padding:0 18px
          line-height:40px
          font-size:12px
          text-align:right
          background:#f3f5f7
          border-bottom:1px solid rgba(7, 17, 27, .1)
          .title
            float:left
            font-size:14px
      .cartList-item
        position:relative
        padding:0 18px
        .price
          position:absolute
          right:120px
          font-weight:700
          color:red
        .cartControl-box
          position:absolute
          right:18px
          top:5px

    .ball-container
      .ball
        position:fixed
        left:36px
        bottom:22px
        z-index:1000
        transition:all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width:16px
          height:16px
          border-radius:50%
          background:rgb(0, 160, 220)
          transition:all .4s linear
  .pageCover
    position:fixed
    width:100%
    height:100%
    top:0
    left:0
    background:rgba(7, 17, 27, 0)
    opacity:0
    transition:all 1s ease
    &.show
      background:rgba(7, 17, 27, .6)
      opacity:1
      transition:all 1s ease
</style>
