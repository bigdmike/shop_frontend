module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://kitchen.yongxin-demo.com',
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
