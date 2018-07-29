const contentful = require('contentful')
const contentfulConfig = require('../.contentful.js')

const config = {
  space: contentfulConfig.CTF_SPACE_ID,
  accessToken: contentfulConfig.CTF_CDA_ACCESS_TOKEN
}

module.exports = {
  createClient() {
    return contentful.createClient(config)
  }
}
