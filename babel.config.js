module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
        'module:metro-react-native-babel-preset',
        'babel-preset-expo'
    ],
    plugins: [
      'react-native-reanimated/plugin',
      'react-native-iconify/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
          verbose: false,
        },
      ],
      [
        'module-resolver',

        {
          root: ['.'],
          alias: {
            '@shared': './src/shared',
          },
        },
      ],
    ],
  };
};
