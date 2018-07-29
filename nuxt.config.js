// [WprdPress]
const axios = require('axios')
const config = require('./api/wp/config/index')

// [Contentful]
/* const config = require('./api/contentful/config/index')
const contentful = require('./.contentful.js')
const client = require('contentful').createClient({
  space: contentful.CTF_SPACE_ID,
  accessToken: contentful.CTF_CDA_ACCESS_TOKEN
}) */

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${config.title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `${config.description}`
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui']
  },
  plugins: ['~plugins/element-ui', '~/plugins/mixin'],
  css: ['element-ui/lib/theme-chalk/index.css'],
  modules: [
    '@nuxtjs/pwa',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-XXXX-XXX'
      }
    ]
  ],
  manifest: {
    name: `${config.title}`,
    lang: 'ja'
  },
  // [generate] WordPressの場合
  generate: {
    interval: 500,
    routes: () => {
      return Promise.all([
        axios.get(`${config.endpoint}/wp/v2/post_all_id`),
        axios.get(`${config.endpoint}/wp/v2/page_all_slug`)
      ]).then(data => {
        const posts = data[0]
        const pages = data[1]
        return posts.data
          .map(post => {
            return {
              route: '/post/' + post.id,
              payload: post
            }
          })
          .concat(
            pages.data.map(page => {
              return {
                route: page.slug,
                payload: page
              }
            })
          )
      })
    }
  }
  // [generate] Contentfulの場合
  /* generate: {
    interval: 500,
    routes: () => {
      return Promise.all([
        client.getEntries({ content_type: contentful.CTF_POST_TYPE_ID }),
        client.getEntries({ content_type: contentful.CTF_PAGE_TYPE_ID })
      ]).then(data => {
        const posts = data[0]
        const pages = data[1]
        return posts.items
          .map(post => {
            return {
              route: '/post/' + post.sys.id,
              payload: post
            }
          })
          .concat(
            pages.items.map(page => {
              return {
                route: page.fields.slug,
                payload: page
              }
            })
          )
      })
    }
  } */
}
