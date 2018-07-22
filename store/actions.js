import api from '../api/wp/index'

export default {
  /* async nuxtServerInit({ dispatch }) {
  }, */
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
