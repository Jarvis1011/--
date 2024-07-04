const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['tw', 'en', 'jp', 'kr'],
    defaultLocale: 'tw',
    localeDetection: false,
  },
};
