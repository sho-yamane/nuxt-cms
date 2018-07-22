<template lang="pug">
  el-container.PostsIdPage
    el-header
      app-header
    el-main
      app-posts(
        title="ブログ"
        type="posts"
        :page="page"
        :per-page="perPage"
      )
    el-footer
      app-footer
</template>

<script>
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import AppPosts from '../../components/AppPosts'
export default {
  name: 'PostsIdPage',
  components: { AppPosts, AppFooter, AppHeader },
  data() {
    return {
      perPage: 9
    }
  },
  async asyncData({ params }) {
    return {
      page: parseInt(params.id)
    }
  },
  head() {
    return {
      title: `記事一覧(${this.page}ページ目)`
    }
  }
}
</script>

<style scoped lang="scss">
</style>
