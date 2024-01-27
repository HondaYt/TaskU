module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo'],
      // ['module:metro-react-native-babel-preset'],
    ],

    plugins: [
      ['react-native-reanimated/plugin'],
      ['react-native-paper/babel'],
      [
        'module-resolver',
        {
          root: ['./'], // ルートディレクトリを指定
          alias: {
            components: './components',
            assets: './assets',
            screens: './screens',
            img: './img',
          },
        },
      ],
    ],
  };
};
