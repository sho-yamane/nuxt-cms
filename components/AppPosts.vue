<template lang="pug">
  .AppPosts
    .AppPosts_Inner(v-loading.body="loading")
      app-heading.AppPosts_Title(v-if="title !== ''") {{ title }}
      .AppPosts_Items
        .AppPosts_Item(v-for="(post, index) in posts.data" :key="post.id")
          nuxt-link(:to="`/post/${post.id}`")
            el-card.AppPosts_Card(:body-style="{ padding: '0px' }")
              img.AppPosts_ItemThumbnail(:src="post.thumbnail || noImageUrl")
              .AppPosts_ItemContent
                time.AppPosts_ItemTime {{ dateFormat(post.date) }}
                h3.AppPosts_ItemTitle {{ post.title }}
      .AppPosts_ButtonContainer(v-if="type === 'index'")
        el-button.AppPosts_Button(type="primary" @click="toAllPosts") 全記事見る
      .AppPosts_Pager(v-else-if="type === 'posts'")
        el-button.AppPosts_Button(v-if="parseInt(page) !== 1" type="primary" @click="prevPage") Prev
        el-button.AppPosts_Button(v-if="parseInt(page) < posts.totalPages" type="primary" @click="nextPage") Next
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppHeading from './AppHeading'
export default {
  name: 'AppPosts',
  components: { AppHeading },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'index'
    },
    page: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 6
    },
    thumbnailSize: {
      type: String,
      default: 'large' // full or large or medium
    }
  },
  data() {
    return {
      loading: true,
      noImageUrl:
        'https://upload.wikimedia.org/wikipedia/ja/b/b5/Noimage_image.png'
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  async created() {
    const urlParams = {
      page: this.page,
      perPage: this.perPage,
      thumbnailSize: this.thumbnailSize
    }
    await this.fetchPosts(urlParams)
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchPosts']),
    toAllPosts() {
      this.$router.push('/posts')
    },
    prevPage() {
      if (parseInt(this.page) - 1 === 1) {
        this.$router.push('/posts')
      } else {
        this.$router.push(`/posts/${parseInt(this.page) - 1}`)
      }
    },
    nextPage() {
      this.$router.push(`/posts/${parseInt(this.page) + 1}`)
    },
    dateFormat(date) {
      return this.$_dateFormat(date)
    }
  }
}
</script>

<style scoped lang="scss">
.AppPosts {
  a {
    text-decoration: none;
    display: block;
  }
  &_Inner {
    width: 1140px;
    padding: 60px 30px 30px;
    margin: 0 auto;
  }
  &_Items {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
  &_Item {
    margin-bottom: 30px;
    width: 31%;
    border: 1px solid #eaeaea;
  }
  &_ItemContent {
    padding: 15px;
  }
  &_Card {
    border: none;
    box-shadow: none;
  }
  &_ItemThumbnail {
    width: 100%;
    height: auto;
  }
  &_ItemTime {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 7px;
  }
  &_ItemTitle {
    line-height: 1.5;
    font-size: 16px;
  }
  &_ButtonContainer,
  &_Pager {
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
