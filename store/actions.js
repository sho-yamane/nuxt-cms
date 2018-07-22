import api from '../api/wp/index'

export default {
  async nuxtServerInit({ dispatch }) {
    dispatch('fetchMeta')
    dispatch('fetchCategories')
  },
  async fetchMeta({ commit }) {
    return new Promise(() => {
      api.getMeta().then(response => {
        commit('updateMeta', response)
      })
    })
  },
  async fetchCategories({ commit }) {
    return new Promise((resolve, reject) => {
      api.getCategories().then(
        response => {
          commit('updateCategories', response)
          resolve(response)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  async fetchPosts({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getPosts(params).then(
        response => {
          commit('updatePosts', response)
          resolve(response)
        },
        response => {
          reject(response)
        }
      )
    })
  }
}
