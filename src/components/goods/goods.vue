<template>
  <div class="goods">
    <!--Begin Menu-->
    <div class="menu" ref="menu">
      <ul>
        <li class="menu-item border-1px" v-for="(good,index) in goods" @click="showThis(index,$event)" :class="{'current':currentIndex === index}">
          <div class="content supports">
            <span class="icon" :class="classMap[good.type]" v-show="good.type>0"></span><span class="text">{{good.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--End Menu-->

    <!--Begin Main-->
    <div class="main" ref="main">
      <ul>
        <li class="good" v-for="good in goods">
          <dl>
            <!--标题-->
            <dt class="title">{{good.name}}</dt>
            <dd class="food" v-for="food in good.foods">
              <img class="img" :src="food.icon" alt="">
              <!--单品-->
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="description mt-8 text-gray">{{food.description}}</div>
                <div class="sellCount mt-8 text-gray">月售{{food.sellCount}}份<span class="ml-12">好评率{{food.rating}}</span></div>
                <div
                    class="price mt-8"><span>￥</span><span class="money">{{food.price}}</span><s v-if="food.oldPrice" class="oldPrice text-gray">￥{{food.oldPrice}}</s>
                  <!--<span @click="addFood(food)">add</span>-->
                </div>
                <!--添加商品-->
                <cartcontrol class="cartcontrol-box" :food="food"></cartcontrol>
              </div>
            </dd>
          </dl>
      </ul>
    </div>
    <!--End Main-->
    <!--购物车-->
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        var dt = res.data
        if (dt.errno === 0) {
          this.goods = dt.data
          // 加载scroll
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
//            console.log('currindex::' + i)
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            food.count && foods.push(food)
          })
        })
        return foods
      }
    },
    methods: {
      // 初始化scroll
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menu, {
          click: true
        })
        this.mainScroll = new BScroll(this.$refs.main, {
          click: true, // 是否启用click事件
          probeType: 3 // 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发 - scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        })
        // 监听滚动并传值
        this.mainScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 计算商品单品的高度，并添加到数组
      _calculateHeight() {
        let goods = this.$refs.main.getElementsByClassName('good')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < goods.length; i++) {
          height += goods[i].clientHeight
          this.listHeight.push(height)
        }
      },
      showThis(index, event) {
        // 解决PC端scroll派发两次点击事件的bug
        if (!event._constructed) {
          return
        }
        let goods = this.$refs.main.getElementsByClassName('good')
        this.mainScroll.scrollToElement(goods[index], 400)
//        console.log('click::' + index)
      },
      /**
       * 添加商品
       * */
      addFood(food) {
        if (this.seletFoods.indexOf(food) > 0) {
          this.seletFoods[this.seletFoods.indexOf(food)].count += 1
        } else {
          food.count = 1
          this.seletFoods.push(food)
        }
      }
    },
    components: {
      shopcart,
      cartcontrol
    },
    events: {
      'cart.add'(target) {
        console.log(target)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods
    position:absolute
    top:174px
    left:0
    bottom:48px
    width:100%
    display:flex
    overflow:hidden

    .menu
      flex:0 0 80px
      width:80px
      background:#f3f5f7
      .menu-item
        display:table
        padding:0 12px
        width:56px
        height:54px
        vertical-align:middle
        &.current
          position:relative
          top:-1px
          .content:after
            border-bottom:0
          background:white

        .content
          display:table-cell
          vertical-align:middle
          border-1px(rgba(7, 17, 27, .1))

    .main
      flex:1
      .good
        .title
          font-size:12px
          height:26px
          line-height:26px
          padding-left:14px
          color:rgb(147, 153, 159)
          background:#f3f5f7
          border-left:2px solid #d9dde1
        .food
          display:flex
          padding:18px
          font-size:0
          .img, .content
            display:inline-block
            vertical-align:top
            font-size:12px
          .img
            flex:0 0 57px
            width:57px
            height:57px
          .content
            position:relative
            flex:1
            margin:2px 0 0 10px
            font-size:10px
            .description
              line-height:12px
            .price
              vertical-align:baseline
              color:rgb(240, 20, 20)
              .oldPrice
                margin-left:8px
                font-weight:700
            .name, .money
              font-size:14px
            .money
              font-weight:700
            .text-gray
              color:rgb(147, 153, 159)
            .cartcontrol-box
              position:absolute
              bottom:-10px
              right:0
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
          bg-image('decrease_2')
        &.guarantee
          bg-image('guarantee_2')
        &.invoice
          bg-image('invoice_2')
        &.special
          bg-image('special_2')
        &.discount
          bg-image('discount_2')
</style>
