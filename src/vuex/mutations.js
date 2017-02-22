/**
 * Created by RuiXue on 2017/02/16.
 */
'use strict'
export default {
  SHOW_ALERT (state, data) {
    data.show = true
    state.alert = data
  },
  HIDE_ALERT (state) {
    state.alert.show = false
  },
  GETLIST (state, amount) {
    state.list = amount
  },
  // 官方例子，加减
  INCREASE(state, amount) {
    state.count = state.count + amount
  },
  REDUCE(state, amount) {
    state.count = state.count - amount
  },
  increment (state) {
    state.count++
  }
}
