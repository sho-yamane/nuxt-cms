import { createClient } from '~/plugins/contentful.js'
import contentfulConfig from '~/.contentful'

const client = createClient()

export default {
  getPage(params) {
    return new Promise(resolve => {
      client
        .getEntries({
          content_type: contentfulConfig.CTF_PAGE_TYPE_ID,
          'fields.slug': params.slug
        })
        .then(response => {
          const data = [...response.items][0]
          const filteredPage = {
            content: data.fields.body,
            date: data.sys.updatedAt,
            slug: data.fields.slug,
            title: data.fields.title,
            thumbnail: data.fields.featuredImage
              ? data.fields.featuredImage.fields.file.url
              : null
          }
          resolve(filteredPage)
        })
        .catch(console.error)
    })
  },
  getPost(params) {
    return new Promise(resolve => {
      client
        .getEntries({
          content_type: contentfulConfig.CTF_POST_TYPE_ID,
          'sys.id': params.id
        })
        .then(response => {
          const data = [...response.items][0]
          const filteredPage = {
            content: data.fields.body,
            date: data.sys.updatedAt,
            slug: data.fields.slug,
            title: data.fields.title,
            thumbnail: data.fields.featuredImage
              ? data.fields.featuredImage.fields.file.url
              : null
          }
          resolve(filteredPage)
        })
        .catch(console.error)
    })
  },
  getPosts(params) {
    return new Promise((resolve, reject) => {
      client
        .getEntries({
          content_type: contentfulConfig.CTF_POST_TYPE_ID,
          limit: params.perPage,
          skip: (params.page - 1) * params.perPage,
          order: 'sys.createdAt',
          'fields.category.sys.id': params.catId || null
        })
        .then(response => {
          const data = [...response.items]
          if (data.length > 0) {
            const filteredPosts = {
              total: response.total,
              totalPages: Math.ceil(response.total / params.perPage),
              data: data.map(item => ({
                id: item.sys.id,
                title: item.fields.title,
                thumbnail: item.fields.featuredImage
                  ? item.fields.featuredImage.fields.file.url
                  : null,
                content: item.fields.body,
                slug: item.slug,
                date: item.sys.updatedAt
              }))
            }
            resolve(filteredPosts)
          } else {
            reject(response)
          }
        })
        .catch(console.error)
    })
  },
  getCategories() {
    return new Promise(resolve => {
      client
        .getEntries({
          content_type: contentfulConfig.CTF_CATEGORY_TYPE_ID
        })
        .then(response => {
          const data = [...response.items]
          if (data.length > 0) {
            const filteredCategories = {
              data: data.map(item => ({
                slug: item.fields.title,
                id: item.sys.id
              }))
            }
            resolve(filteredCategories.data)
          }
        })
        .catch(console.error)
    })
  }
}
