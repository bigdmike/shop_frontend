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
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Krace',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
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
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240,
            deleteOriginalAssets: false,
          }),
        ],
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
      .init((Plugin) => new Plugin({ analyzerPort: 1235 }));
  },
};
