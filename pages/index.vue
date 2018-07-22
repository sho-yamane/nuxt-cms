<template lang="pug">
  el-container.IndexPage
    el-header
      app-header
    el-main
      app-slider
      app-service
      app-posts(
        title="ブログ"
        type="index"
      )
    el-footer
      app-footer
</template>

<script>
import { mapState } from 'vuex'
import AppSlider from '../components/AppSlider.vue'
import AppService from '../components/AppService.vue'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import AppPosts from '../components/AppPosts'

export default {
  components: { AppPosts, AppFooter, AppHeader, AppSlider, AppService },
  computed: {
    ...mapState(['meta'])
  },
  head() {
    return {
      title: `${this.meta.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.meta.description}`
        }
      ]
    }
  }
}
</script>
