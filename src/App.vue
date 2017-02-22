<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">
      <router-link class="tab-item" to="/goods" tag="li">商品{{count}}</router-link>
      <router-link class="tab-item" to="/ratings" tag="li">评论</router-link>
      <router-link class="tab-item" to="/seller" tag="li">商家</router-link>
    </ul>

    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="fade" mode="out-in"> //mode属性则控制离开/进入的过渡时间
      <router-view :seller="seller"></router-view>
    </transition>

    <loading v-show="isLoading"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'
  import loading from 'components/loading/loading'
  import bus from 'common/js/bus'

  import { mapState } from 'vuex'
  //  import Vue from 'vue'
  //  import Vuex from 'vuex'
  //  Vue.use(Vuex)
  //
  //  const store = new Vuex.Store({
  //    state: {
  //      count: 0
  //    },
  //    mutations: {
  //      increment(state) {
  //        state.count++
  //        state.count++
  //      }
  //    }
  //  })

  const ERR_OK = 0

  export default {
    components: {
      'v-header': header,
      loading
    },
    data() {
      return {
        seller: {},
        isLoading: false
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        if (res.data.errno === ERR_OK) {
          this.seller = res.data.data
        }
//        console.log(this.datas) // -> 1
      })

      bus.$on('toggleLoading', (show) => {
        this.isLoading = show
//        console.log(show)
      })
    },
    computed: {
      ...mapState(['count'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"

  .app
    .tab
      display:flex
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex:1
        height:40px
        line-height:40px
        text-align:center
        font-size:14px
        color:rgb(77, 85, 93)
        &.active
          color:rgb(240, 20, 20)
    .fade-enter-active, .fade-leave-active
      transition:opacity .2s ease;
    .fade-enter, .fade-leave-active
      opacity:0

</style>
