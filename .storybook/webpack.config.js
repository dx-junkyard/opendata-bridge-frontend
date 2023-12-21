const path = require('path');

module.exports = ({ config }) => {
  config.resolve.modules = [
    path.resolve(__dirname, '..'),
    'node_modules',
  ];

  config.resolve.alias = {
    ...config.resolve.alias,
    '@/components': path.resolve(__dirname, '../src/components'),
    '@/types': path.resolve(__dirname, '../src/types'),
    '@/hooks': path.resolve(__dirname, '../src/hooks'),
  };

  return config;
};
