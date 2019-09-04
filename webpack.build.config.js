var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'vue-bl-mark-down-editor.js',
    chunkFilename: 'js/[name].js',
    library: 'MarkDownEditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "vue-style-loader"
          ]
        })
        // use: [
        //   'vue-style-loader',
        //   'css-loader'
        // ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          publicPath: '../',
          name: 'images/[name].[ext]?[hash:7]'
        }
      },
      //{ test: /\.(woff|ttf|eot|svg)$/, loader: 'url-loader?name=font/[name].[hash:7].[ext]&publicPath=../' },
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?.*)?$/,
        loader: 'file-loader',
          options: {
            limit: 10000,
            publicPath: '../',
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  plugins:[
    // 分离css
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ]
}

