module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.yaowenfruit.com',
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
