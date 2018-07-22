<template lang="pug">
  el-container.SlugPage
    el-header
      app-header
    el-main.SlugPage_Main
      .SlugPage_MainInner
        .SlugPage_ThumNailContainer(v-if="page.thumbnail")
          img.SlugPage_ThumNail(:src="page.thumbnail")
        .SlugPage_Meta
          h1.SlugPage_Title {{ page.title }}
        .SlugPage_Content(v-html="page.content")
    el-footer
      app-footer
</template>

<script>
import api from '../../api/wp/index'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
export default {
  name: 'SlugPage',
  components: { AppFooter, AppHeader },
  async asyncData({ params }) {
    const urlParams = {
      slug: params.slug,
      thumbnailSize: 'large' // full or large or medium
    }
    const page = await api.getPage(urlParams).then(response => {
      return response
    })
    return {
      page: page
    }
  },
  head() {
    return {
      title: `${this.page.title}`
    }
  }
}
</script>

<style scoped lang="scss">
.SlugPage {
  &_Main {
    padding: 60px 0;
  }
  &_MainInner {
    width: 1140px;
    margin: 0 auto;
    padding: 0 30px;
  }
  &_ThumNailContainer {
    text-align: center;
  }
  &_ThumNail {
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: 30px;
  }
  &_Meta {
    margin-bottom: 30px;
    text-align: center;
  }
  &_Title {
    line-height: 1.5;
    font-size: 21px;
  }
  &_Content {
    width: 800px;
    margin: 0 auto;
  }
}
</style>
