const axios = require('axios')
// const config = require('./api/wp/config/index')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-cms',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
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
  generate: {
    interval: 500,
    routes: () => {
      const endpoint =
        'https://sho-yamane.mixh.jp/sample/index.php/wp-json/wp/v2'

      return Promise.all([
        axios.get(`${endpoint}/post_all_id`),
        axios.get(`${endpoint}/page_all_slug`)
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
}
