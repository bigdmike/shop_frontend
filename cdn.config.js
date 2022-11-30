module.exports = {
  useCDN: true,
  externals: {
    gsap: 'gsap',
    ScrollTrigger: 'ScrollTrigger',
    VueSlickCarousel: 'vue-slick-carousel',
    vue: 'Vue',
  },
  CDN: {
    css: [],
    js: [
      'https://unpkg.com/vue-slick-carousel@1.0.6/dist/vue-slick-carousel.umd.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js',
      'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    ],
  },
};
