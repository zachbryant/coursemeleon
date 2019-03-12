const path = require('path');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  outputDir: path.resolve(__dirname, '/server/public'),  //set output path
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    },
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
