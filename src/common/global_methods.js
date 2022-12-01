import Vue from 'vue';
import store from '@/store';
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
