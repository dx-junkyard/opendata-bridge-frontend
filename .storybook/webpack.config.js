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
    '@/util': path.resolve(__dirname, '../src/util'),
    '@/lib': path.resolve(__dirname, '../src/lib'),
    '@/service': path.resolve(__dirname, '../src/service'),
  };

  return config;
};
