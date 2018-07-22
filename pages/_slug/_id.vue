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
  async asyncData({ params }) {
    return {
      page: parseInt(params.id),
      catSlug: params.slug
    }
  },
  head() {
    return {
      title: `${this.catSlug}(${this.page}ページ目)`
    }
  }
}
</script>

<style scoped lang="scss">
</style>
