import axios from 'axios'
import config from './config/index'

export default {
  endpoint: config.endpoint,
  getPage(params) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.endpoint
      axios.get(`/wp/v2/pages?_embed&slug=${params.slug}`).then(response => {
        const data = [...response.data][0]
        if (response.status === 200 && response.data.length > 0) {
          const filteredPage = {
            content: data.content.rendered,
            date: data.date,
            slug: data.slug,
            title: data.title.rendered,
            thumbnail: data['_embedded']['wp:featuredmedia']
              ? data['_embedded']['wp:featuredmedia'][0]['media_details'][
                  'sizes'
                ][params.thumbnailSize]['source_url']
              : null
          }
          resolve(filteredPage)
        } else {
          reject(response)
        }
      })
    })
  },
  getPost(params) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.endpoint
      axios.get(`/wp/v2/posts/${params.id}?_embed`).then(response => {
        const data = response.data
        if (response.status === 200) {
          const filteredPost = {
            id: data.id,
            content: data.content.rendered,
            date: data.date,
            title: data.title.rendered,
            thumbnail: data['_embedded']['wp:featuredmedia']
              ? data['_embedded']['wp:featuredmedia'][0]['media_details'][
                  'sizes'
                ][params.thumbnailSize]
                ? data['_embedded']['wp:featuredmedia'][0]['media_details'][
                    'sizes'
                  ][params.thumbnailSize]['source_url']
                : data['_embedded']['wp:featuredmedia'][0]['media_details'][
                    'sizes'
                  ]['full']['source_url']
              : null
          }
          resolve(filteredPost)
        } else {
          reject(response)
        }
      })
    })
  },
  getPosts(params) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.endpoint
      axios
        .get('/wp/v2/posts', {
          params: {
            _embed: 1,
            per_page: params.perPage,
            page: params.page,
            categories: params.catId || null
          }
        })
        .then(response => {
          const data = [...response.data]
          if (response.status === 200 && response.data.length > 0) {
            const filteredPosts = {
              total: response.headers['x-wp-total'],
              totalPages: response.headers['x-wp-totalpages'],
              data: data.map(item => ({
                id: item.id,
                title: item.title.rendered,
                thumbnail: item['_embedded']['wp:featuredmedia']
                  ? item['_embedded']['wp:featuredmedia'][0]['media_details'][
                      'sizes'
                    ][params.thumbnailSize]
                    ? item['_embedded']['wp:featuredmedia'][0]['media_details'][
                        'sizes'
                      ][params.thumbnailSize]['source_url']
                    : item['_embedded']['wp:featuredmedia'][0]['media_details'][
                        'sizes'
                      ]['full']['source_url']
                  : null,
                content: item.content.rendered,
                excerpt: item.excerpt.rendered,
                slug: item.slug,
                date: item.date
              }))
            }

            resolve(filteredPosts)
          } else {
            reject(response)
          }
        })
    })
  },
  getCategories() {
    return new Promise(resolve => {
      axios.defaults.baseURL = this.endpoint
      return axios.get('/wp/v2/categories').then(response => {
        const data = [...response.data]
        console.log(data)
        if (response.status === 200 && response.data.length > 0) {
          resolve(data)
        }
      })
    })
  }
}
