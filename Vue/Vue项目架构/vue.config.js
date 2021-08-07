const path = require('path')
module.exports = {  
  publicPath: './', // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  integrity: false, // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'))
  },
  configureWebpack: (config) => {    
  if (process.env.NODE_ENV === 'production') {      
      config.mode = 'production' // 生产环境
    } else {      
      config.mode = 'development' // 开发环境
    }
  },  
  // css相关配置
  css: {    
    extract: true, // 是否分离css（插件ExtractTextPlugin）
    sourceMap: false, // 是否开启 CSS source maps 
    loaderOptions: {}, // css预设器配置项   
    requireModuleExtension: false, // 是否启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否使用 thread-loader
  pwa: {}, // PWA 插件相关配置
  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,   
    // http 代理配置
    proxy: {      
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {          
          '^/api': ''
        }
      }
    },
    before: (app) => {}
  }, 
  // 第三方插件配置
  pluginOptions: {

  }
}