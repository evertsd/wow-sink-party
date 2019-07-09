const path = require('path');

module.exports = (config) => {
  console.log('config-overrides');

  config.resolve = {
    ...config.resolve,
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  };
  console.log(config.resolve);
  return config;
};
