const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cdnConfig = require('./cdn.config.js');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.krace.com.tw',
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  filenameHashing: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '系统名称',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      // 调用：htmlWebpackPlugin.options.CDN（设置CDN链接）
      CDN:
        process.env.NODE_ENV === 'production' && cdnConfig.useCDN
          ? cdnConfig.CDN
          : null,
    },
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/, // 需要压缩的文件类型
            //|\.jpg$|\.jpeg$|\.png
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
          }),
        ],
        // optimization: {
        //   runtimeChunk: 'single',
        //   splitChunks: {
        //     chunks: 'all',
        //     maxInitialRequests: Infinity,
        //     minSize: 20000,
        //     cacheGroups: {
        //       vendor: {
        //         test: /[\\/]node_modules[\\/]/,
        //         name(module) {
        //           // get the name. E.g. node_modules/packageName/not/this/part.js
        //           // or node_modules/packageName
        //           const packageName = module.context.match(
        //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
        //           )[1];
        //           // npm package names are URL-safe, but some servers don't like @ symbols
        //           return `npm.${packageName.replace('@', '')}`;
        //         },
        //       },
        //     },
        //   },
        // },
        externals:
          process.env.NODE_ENV === 'production' && cdnConfig.useCDN
            ? cdnConfig.externals
            : {},
      };
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(BundleAnalyzerPlugin)
      .init((Plugin) => new Plugin({ analyzerPort: 1234 }));
  },
};
