<template lang="pug">
  el-container.CatIdPage
    el-header
      app-header
    el-main
      app-posts(
        title="News"
        type="posts"
        :page="page"
        :per-page="perPage"
        :cat-slug="catSlug"
      )
    el-footer
      app-footer
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import AppPosts from '../../components/AppPosts'
export default {
  name: 'CatIdPage',
  components: { AppPosts, AppFooter, AppHeader },
  data() {
    return {
      perPage: 9,
      catSlug: 'news'
    }
  },
  computed: {
    ...mapState(['meta'])
  },
  async asyncData({ store, params }) {
    if (!Object.keys(store.state.meta).length) {
      await store.dispatch('fetchMeta')
    }

    return {
      page: parseInt(params.id),
      catSlug: params.slug
    }
  },
  head() {
    return {
      title: `${this.catSlug}(${this.page}ページ目) - ${this.meta.title}`
    }
  }
}
</script>

<style scoped lang="scss">
</style>
