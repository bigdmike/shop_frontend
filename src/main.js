import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMeta from 'vue-meta';
import './common/global_methods';
import { loadScript } from './common/loadScript';

Vue.config.productionTip = false;

Vue.use(VueMeta, {
  refreshOnceOnNavigation: false,
});

const loadVueSlickCarousel = () =>
  loadScript(
    'https://unpkg.com/vue-slick-carousel@1.0.6/dist/vue-slick-carousel.umd.min.js'
  );

const initVue = () => {
  Vue.component('VueSlickCarousel', window['vue-slick-carousel']);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
};

loadVueSlickCarousel()
  .then(initVue)
  .catch((err) => console.warn(err));
