module.exports = {
  /*
assetsDir: undefined,
publicPath: undefined,
outputDir: undefined,
runtimeCompiler: true,
productionSourceMap: undefined,
parallel: undefined,
css: undefined */
  devServer: {
    // assetsDir: undefined,
    // publicPath: undefined,
    // outputDir: undefined,
    // runtimeCompiler: true,
    // productionSourceMap: undefined,
    // parallel: undefined,
    // css: undefined,
    proxy: {
      "/api": {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: 'static',
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}
