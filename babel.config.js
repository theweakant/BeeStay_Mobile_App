module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Plugin của NativeWind 4.x không phải 'nativewind/babel' nữa
      'nativewind'
    ]
  };
};