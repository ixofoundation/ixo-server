var webpack = require('webpack');
var client = require('./client');
var server = require('./server');

client.debug = server.debug = false;
client.devtool = server.devtool = null;

// Add uglify and dedupe
client.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
}));
client.plugins.push(new webpack.optimize.DedupePlugin());

// Remove source maps
server.plugins = server.plugins.filter(p => !(p instanceof webpack.BannerPlugin));

client.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}));

module.exports = [server, client];
