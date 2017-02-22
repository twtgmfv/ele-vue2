/**
 * Created by RuiXue on 2017/02/14.
 */
import fn from './function.js'

export default {
  install(Vue) {
    Vue.prototype.global = fn
  }
}
