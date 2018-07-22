<template lang="pug">
  el-container.PostIdPage
    el-header
      app-header
    el-main.PostIdPage_Main
      .PostIdPage_MainInner
        .PostIdPage_ThumNailContainer(v-if="post.thumbnail")
          img.PostIdPage_ThumNail(:src="post.thumbnail")
        .PostIdPage_Meta
          time.PostIdPage_Time {{ dateFormat(post.date) }}
          h1.PostIdPage_Title {{ post.title }}
        .PostIdPage_Content(v-html="post.content")
    el-footer
      app-footer
</template>

<script>
import api from '../../api/wp/index'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import AppHeading from '../../components/AppHeading'
export default {
  name: 'PostIdPage',
  components: { AppHeading, AppFooter, AppHeader },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  },
  async asyncData({ params }) {
    const urlParams = {
      id: params.id,
      thumbnailSize: 'large' // full or large or medium
    }
    const post = await api.getPost(urlParams).then(response => {
      return response
    })
    return {
      post: post
    }
  },
  methods: {
    dateFormat(date) {
      return this.$_dateFormat(date)
    }
  },
  head() {
    return {
      title: `${this.post.title}`
    }
  }
}
</script>

<style scoped lang="scss">
.PostIdPage {
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
  &_Time {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 7px;
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
