import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = () =>
  new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })

export default store
