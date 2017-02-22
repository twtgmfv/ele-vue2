/**
 * Created by RuiXue on 2017/02/16.
 */
'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug
})

// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment(state) {
//       state.count++
//     }
//   }
// })
