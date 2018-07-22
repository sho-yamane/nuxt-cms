<template lang="pug">
  el-container.PostsPage
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
  name: 'PostsPage',
  components: { AppPosts, AppFooter, AppHeader },
  data() {
    return {
      page: 1,
      perPage: 9
    }
  }
}
</script>

<style lang="scss" scoped>
.PostsPage {
}
</style>
