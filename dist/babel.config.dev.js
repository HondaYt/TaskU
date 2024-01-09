"use strict";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [['module-resolver', {
      root: ['./'],
      // ルートディレクトリを指定
      alias: {
        components: './components',
        assets: './assets',
        screens: './screens'
      }
    }]]
  };
};