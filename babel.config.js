module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['nativewind/babel'], // <- Cái này là 1 chuỗi, không phải object `.plugins`
  };
};
