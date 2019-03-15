module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  module: {
    loaders: [

      // ...

      // Css loader.
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      },

      // Font awesome loader.
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.posix.join('path/to/yours/assets/directory', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: {

      // ...

      // Css loader for Webpack 1.x .
      css: 'vue-style-loader!css-loader'
    }
  },
  plugins: [

    // ...

    // Jquery loader plugin.
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
