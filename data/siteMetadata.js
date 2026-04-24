/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Personal Page',
  author: '',
  headerTitle: 'Personal Page',
  description: 'Personal single-page site',
  language: 'ru-RU',
  theme: 'light',
  siteUrl: 'https://example.com',
  siteRepo: 'https://github.com/kr1zal/WEB-people',
  siteLogo: `${process.env.BASE_PATH || ''}/static/favicons/favicon-32x32.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/favicons/favicon-32x32.png`,
  stickyNav: true,
  email: '',
  github: '',
  telegram: '',
  linkedin: '',
  locale: 'ru-RU',
  analytics: {},
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: '',
    },
  },
}

module.exports = siteMetadata
