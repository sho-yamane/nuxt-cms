export default {
  updateMeta: (state, meta) => {
    state.meta.title = meta.name
    state.meta.description = meta.description
  },
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateCategories: (state, categories) => {
    state.categories = categories
  }
}
