import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.$ImageUrl = (item) => {
  return item == '' ? '' : process.env.VUE_APP_BASE_API + item;
};

Vue.prototype.$MoneyFormat = (price) => {
  let val = (price / 1).toFixed(0).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
