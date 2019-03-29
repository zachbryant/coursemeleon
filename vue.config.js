module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
