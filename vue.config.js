module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8081,
    https: true,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
