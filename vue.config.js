module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
