var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/* Util method for CommonsChunkPlugin plugin */
function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}

module.exports = function make(options) {

  var shouldTranspileOnly = process.env.TS_CONFIG === 'fast';

  var isClient = (options.target === 'web');

  var entry = [];

  // Init plugins with provide, define and no errors
  var plugins = [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      __CLIENT__: (options.target === 'web')
    }),
    new webpack.NoErrorsPlugin()
  ];

  if (isClient) {
      plugins.push(new webpack.optimize.CommonsChunkPlugin({
          name: 'public_vendor',
          chunks: ['public_site'],
          minChunks: function(module, count) {
              return isExternal(module) /*&& count >= 2*/;
          }
      }));
  }

  if (!isClient) {
      plugins.push(new webpack.DefinePlugin({
          __WEBPACK_SERVER__: true
      }))
  }

  // Add source maps and extract styles
  plugins.push(new ExtractTextPlugin('styles.css'));

  // This code copies all the files inside the src/lib/client-dependencies to the build folder
  plugins.push(new CopyWebpackPlugin([
            { from: 'src/lib/client-dependencies', to: '' },
  ]));

  // Styles loader
  var loader = {
    css: 'css-loader?modules&importLoaders=1&localIdentName=[local]'
  };

  var config = {
    context: path.join(__dirname, '../'),
    debug: options.debug || true,
    devtool: options.devtool || (isClient ? 'cheap-module-eval-source-map' : 'eval-source-map'),
    target: options.target || 'web',
    entry: options.entry,
    plugins: plugins,

    output: {
      path: path.join(__dirname, '..', 'build'),
      filename: path.basename('[name]' , '.tsx') + '.js',
      publicPath: '/js/',
      libraryTarget: (isClient ? 'var' : 'commonjs2'),
      chunkFilename: '[name]-[chunkhash].js'            // Adds hash to code split chunks
    },

    resolve: {
      modulesDirectories: ['./node_modules', './src/components'],
      extensions: ['', '.js', '.ts', '.tsx', '.css']
    },

    module: {
      loaders: [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader?silent=true' + (shouldTranspileOnly ? '&transpileOnly=true' : ''),
            exclude: /node_modules/
        },
        {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            loader: 'url-loader'
        },
        {
            include: /\.json$/, loaders: ['json-loader']
        }
      ],
      preLoaders: [
          // Keep this here (needed later on to push a preloader in this array
      ]
    },

    resolveLoader: {
      alias: {
          "remove-component-css": __dirname + "/loaders/remove-component-css"
      }
    }

  };

  if (isClient) {
      // Adding the remove-component-css preloader so it removes the addComponentCSS() code from .tsx files
      config.module.preLoaders.push({
          test: /\.tsx$/,
          loader: 'remove-component-css'
      });
  }

  if (!isClient) {
    // Don't import node binary packages
    config.externals = /^[a-z\-0-9]+$/;
  }

  return config;
};
