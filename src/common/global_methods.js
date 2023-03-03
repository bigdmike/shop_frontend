import Vue from 'vue';
import store from '@/store';
import router from '@/router';

Vue.prototype.$ImageUrl = (item) => {
  // return item;
  return item == '' ? '' : process.env.VUE_APP_BASE_API + item;
};

Vue.prototype.$GetCloumn = (key) => {
  // return key;
  // console.log(store.state.common_column_data);
  if (store.state.common_column_data != null) {
    const column = store.state.common_column_data.filter(
      (column) => column.Title == key
    );
    return column.length <= 0 ? '' : column[0].Content;
  } else {
    return '';
  }
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
  meta.setAttribute('property', 'prerender-status-code');
  meta.setAttribute('name', 'prerender-status-code');
  meta.content = '404';
  document.getElementsByTagName('head')[0].appendChild(meta);
  router.push('/error_page');
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

Vue.prototype.$AddZeroPad = (val) => {
  return parseInt(val) < 10 ? '0' + val : val;
};

Vue.prototype.$GetCustomPrice = (shopcart_item) => {
  let change_price = 0;
  shopcart_item.product_data.CustomGoodsChangePrice.forEach((change_item) => {
    let match_count = 0;
    if (typeof change_item.CustomSpecID === 'string') {
      change_item.CustomSpecID.split(',').forEach((id) => {
        shopcart_item.active_option.indexOf(id) != -1 ? (match_count += 1) : '';
      });
    } else if (
      typeof change_item.CustomSpecID === 'object' &&
      Array.isArray(change_item.CustomSpecID)
    ) {
      change_item.CustomSpecID.forEach((id) => {
        shopcart_item.active_option.indexOf(id) != -1 ? (match_count += 1) : '';
      });
    }

    if (match_count == change_item.CustomSpecID.length) {
      change_price += parseInt(change_item.ChangePrice);
    }
  });
  return [
    parseInt(shopcart_item.product_data.CustomGoodsStock[0].Price) +
      change_price,
    parseInt(shopcart_item.product_data.CustomGoodsStock[0].SellPrice) +
      change_price,
    parseInt(shopcart_item.product_data.CustomGoodsStock[0].MemberSellPrice) +
      change_price,
  ];
};
