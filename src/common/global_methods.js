import Vue from 'vue';
import store from '@/store';
import router from '@/router';

Vue.prototype.$ImageUrl = (item) => {
  return item == '' ? '' : process.env.VUE_APP_BASE_API + item;
};

Vue.prototype.$GetCloumn = (key) => {
  const column = store.state.common_column_data.filter(
    (column) => column.Title == key
  );
  return column.length <= 0 ? '' : column[0].Content;
};

Vue.prototype.$MoneyFormat = (price) => {
  let val = (price / 1).toFixed(0).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

Vue.prototype.$PageReady = (title) => {
  window.prerenderReady = true;
  window.dataLayer.push({
    event: 'page_view',
    page_title: title,
  });
};

Vue.prototype.$RedirectError = () => {
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'prerender-status-code');
  meta.content = '404';
  document.getElementsByTagName('head')[0].appendChild(meta);
  router.push('/error_page');
  window.prerenderReady = true;
};

Vue.prototype.$LoadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
