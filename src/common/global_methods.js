import Vue from 'vue';
import store from '@/store';
import router from '@/router';

// 將圖片URL補上Domain
Vue.prototype.$ImageUrl = (item) => {
  // 若字串不為空，則依照設定檔回傳API Domain+圖片路徑
  return item == '' ? '' : process.env.VUE_APP_BASE_API + item;
};

// 取得通用欄位資料
Vue.prototype.$GetColumn = (key) => {
  if (store.state.common_column_data != null) {
    const column = store.state.common_column_data.filter(
      (column) => column.Title == key
    );
    return column.length <= 0 ? '' : column[0].Content;
  } else {
    return '';
  }
};

// 金額逗號格式化
Vue.prototype.$MoneyFormat = (price) => {
  let val = (price / 1).toFixed(0).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 頁面初始化完成，準備好渲染
Vue.prototype.$PageReady = (title) => {
  // 告知prerender.io 畫面已準備好可以渲染
  window.prerenderReady = true;
  // GTM事件，頁面瀏覽
  window.dataLayer.push({
    event: 'page_view',
    page_title: title,
  });
};

// 轉跳錯誤頁面
Vue.prototype.$RedirectError = () => {
  // 放上prerender 404的meta tag，告知prerender.io 不需要渲染畫面
  var meta = document.createElement('meta');
  meta.setAttribute('property', 'prerender-status-code');
  meta.setAttribute('name', 'prerender-status-code');
  meta.content = '404';
  document.getElementsByTagName('head')[0].appendChild(meta);
  // 轉跳到錯誤頁面
  router.push('/error_page');
};

// 讀取cdn套件
Vue.prototype.$LoadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 個位數前面補零
Vue.prototype.$AddZeroPad = (val) => {
  return parseInt(val) < 10 ? '0' + val : val;
};

// 取得客製化商品目前選項之價錢
Vue.prototype.$GetCustomPrice = (shopcart_item) => {
  let change_price = 0;
  // 讀取客製化商品的『價格異動資料』陣列
  shopcart_item.product_data.CustomGoodsChangePrice.forEach((change_item) => {
    let match_count = 0;
    // 若『價格異動資料』類行為字串，則先分割為陣列後判斷與目前選擇之選項是否完全相符
    if (typeof change_item.CustomSpecID === 'string') {
      change_item.CustomSpecID.split(',').forEach((id) => {
        shopcart_item.active_option.indexOf(id) != -1 ? (match_count += 1) : '';
      });
    }
    // 若『價格異動資料』類行為陣列，則直接判斷與目前選擇之選項是否完全相符
    else if (
      typeof change_item.CustomSpecID === 'object' &&
      Array.isArray(change_item.CustomSpecID)
    ) {
      change_item.CustomSpecID.forEach((id) => {
        shopcart_item.active_option.indexOf(id) != -1 ? (match_count += 1) : '';
      });
    }

    // 若『價格異動資料』的選項ID陣列與目前選擇之選項ID完全相符，則紀錄異動價錢
    if (match_count == change_item.CustomSpecID.length) {
      change_price += parseInt(change_item.ChangePrice);
    }
  });

  // 返回三種價格：1.原價+異動價格 2.售價+異動價格 3.會員價+異動價格
  return [
    parseInt(shopcart_item.product_data.CustomGoodsStock[0].Price) +
      change_price,
    parseInt(shopcart_item.product_data.CustomGoodsStock[0].SellPrice) +
      change_price,
    parseInt(shopcart_item.product_data.CustomGoodsStock[0].MemberSellPrice) +
      change_price,
  ];
};

// 初始化
Vue.prototype.$LoadDataMixin = (component) => {
  // 若網站資料已經讀取完成，則呼叫頁面初始化
  if (component.$store.getters.data_load_finish) {
    component.PageInit();
  }
  // 監聽網站資料讀取裝態，當狀態完成時呼叫頁面初始化
  component.$watch('$store.getters.data_load_finish', (newVal) => {
    if (newVal) {
      component.PageInit();
    }
  });
  // 監聽網站圖片讀取裝態，當狀態完成時呼叫動畫初始化
  component.$watch('$store.state.image_loaded', (newVal) => {
    if (newVal) {
      component.SetGsap();
    }
  });
};
