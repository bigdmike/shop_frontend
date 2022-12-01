module.exports = {
  useCDN: true,
  externals: {
    vue: 'Vue',
    gsap: 'gsap',
  },
  CDN: {
    css: [],
    js: [
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
      'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    ],
  },
};
