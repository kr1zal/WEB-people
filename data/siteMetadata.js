/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Дегтярева Оксана — Финансовый директор Холдинга',
  author: 'Дегтярева Оксана Владимировна',
  headerTitle: 'Degtyareva',
  description:
    'Дегтярева Оксана Владимировна — финансовый директор Холдинга с 15+ летним опытом. Финансовая структура, юнит-экономика, бюджетирование, управление Холдингом с оборотом 5+ млрд ₽.',
  language: 'ru-RU',
  theme: 'light',
  siteUrl: 'https://example.com',
  siteRepo: 'https://github.com/kr1zal/WEB-people',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/oksana.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/oksana.jpg`,
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
