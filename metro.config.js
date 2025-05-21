const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.blockList = [
  // bloquea la carpeta node_modules/ws y otros módulos problemáticos
  /node_modules\/ws\/.*/,
  /node_modules\/stream\/.*/,
  /node_modules\/events\/.*/,
];

defaultConfig.resolver.extraNodeModules = {
  // redirige ws y stream a módulos vacíos
  ws: path.resolve(__dirname, 'emptyModule.js'),
  stream: path.resolve(__dirname, 'emptyModule.js'),
  events: path.resolve(__dirname, "emptyModule.js"),
};

module.exports = defaultConfig;
