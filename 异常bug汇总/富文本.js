// 1、报错：webpackJsonp is not defined？什么情况
// 解决： https://zhuanlan.zhihu.com/p/47096548
// 这是因为公共文件必须在自己引用的js文件之前引用，可以手动改文件引用。找到build→webpack.prod.conf.js→找到HtmlWebpackPlugin插件，添加如下配置：
new HtmlWebpackPlugin({
  filename: config.build.index,
  template: 'index.html',
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  },
  chunks: ['manifest', 'vendor', 'app'], // 注意！！！！！！！！！手动添加这一行代码！！！！！！！！
  // necessary to consistently work with multiple chunks via CommonsChunkPlugin
  chunksSortMode: 'dependency'
}) 
