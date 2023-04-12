import Vue from 'vue';
import Vuex from 'vuex';
import {
  getColumnData,
  getZipCode,
  getCarouselData,
  getNewsData,
  getNewsCategoryData,
  getCategoryData,
  getProductData,
  getQuestionData,
  getQuestionCategoryData,
  getPaymentData,
  getShipwayData,
  getDealerData,
} from '@/api/page_data.js';

import { shopcart_module } from './shopcart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    main_dialog: {
      status: false, //系統訊息顯示狀態
      content: '', //系統訊息內容
    },
    image_loaded: false, //頁面圖片讀取狀態
    member_token: '', //會員token
    search_dialog: false, //搜尋商品視窗顯示狀態
    shopcart_drawer: false, //購物車顯示狀態
    loading: 0, //Loading狀態，大於0則為讀取中，等於0則為讀取完畢
    common_column_data: null, //通用欄位資料
    carousel_data: null, //首頁輪播資料
    news_data: null, //最新消息資料
    news_category_data: null, //最新消息分類資料
    category_data: null, //商品分類資料
    event_data: null, //獨立銷售頁資料
    all_product_data: null, //所有商品資料，包含已刪除以及停用的商品
    product_data: null, //商品資料
    question_category_data: null, //常見問題分類資料
    question_data: null, //常見問題資料
    zipcode_data: null, //縣市郵遞區號資料
    payment_data: null, //付款方式資料
    shipway_data: null, //物流方式資料
    dealer_data: null, //經銷據點資料
  },
  getters: {
    // 取得資料讀取狀況
    data_load_finish(state) {
      if (
        state.common_column_data != null &&
        state.carousel_data != null &&
        state.news_data != null &&
        state.news_category_data != null &&
        state.category_data != null &&
        state.product_data != null &&
        state.question_category_data != null &&
        state.question_data != null &&
        state.zipcode_data != null &&
        state.payment_data != null &&
        state.shipway_data != null &&
        state.dealer_data != null
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 取得指定ID的獨立銷售頁資料
    event_data: (state) => (key) => {
      if (state.event_data == null) {
        return null;
      }
      const event_data = state.event_data.filter((item) => item.MenuID == key);
      if (event_data.length <= 0) {
        return 'error';
      }
      if (new Date() > new Date(event_data[0].MenuTimeEnd)) {
        return 'error';
      }
      return event_data.length > 0 ? event_data[0] : 'error';
    },
    // 取得指定分類的最新消息
    filter_news_data: (state) => (category_id) => {
      return category_id == ''
        ? state.news_data
        : state.news_data.filter((item) => item.NewsCategoryID == category_id);
    },
    // 取得指定ID的最新消息
    active_news_data: (state) => (news_id) => {
      if (state.news_data == null) {
        return null;
      }
      const active_news_data = state.news_data.filter(
        (item) => item.NewsID == news_id
      );
      return active_news_data.length > 0 ? active_news_data[0] : 'error';
    },
    // 取得指定ID的最新消息分類
    active_news_category_data: (state) => (category_id) => {
      const active_category = state.news_category_data.filter(
        (item) => item.NewsCategoryID == category_id
      );
      return active_category.length > 0 ? active_category[0] : 'error';
    },
    // 取得指定ID的商品分類
    filter_category_data: (state) => (category_id) => {
      const category = state.category_data.filter(
        (item) => item.MenuID == category_id
      );

      return category.length > 0 ? category[0] : null;
    },
    // 取得指定分類的商品
    filter_product_data: (state) => (category_id) => {
      if (category_id == 'all' || category_id == '') {
        return state.product_data;
      } else {
        return state.product_data.filter((item) => {
          return (
            item.Menu.filter((menu) => menu.MenuID == category_id).length > 0
          );
        });
      }
    },
  },
  mutations: {
    // 設定頁面圖片讀取狀態
    SetImageLoaded(state, action) {
      state.image_loaded = action;
    },
    // 設定購物車顯示狀態
    SetShopcartDrawer(state, action) {
      state.shopcart_drawer = action;
    },
    // 設定Loading狀態
    SetLoading(state, action) {
      if (action == 1) {
        state.loading += 1;
      } else {
        state.loading > 0 ? (state.loading -= 1) : '';
      }
    },
    // 設定系統訊息內容與狀態
    SetDialog(state, { status, content }) {
      state.main_dialog.status = status;
      state.main_dialog.content = content;
    },
    // 設定搜尋商品視窗顯示狀態
    SetSearchDialog(state, status) {
      state.search_dialog = status;
    },
    // 依照對應的key設定State資料
    SetStateData(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {
    // 取得經銷據點資料
    getDealerData(state) {
      getDealerData().then((res) => {
        state.commit('SetStateData', {
          key: 'dealer_data',
          val: res.data,
        });
      });
    },
    // 取得通用欄位資料
    getColumnData(state) {
      getColumnData().then((res) => {
        state.commit('SetStateData', {
          key: 'common_column_data',
          val: res.data,
        });
      });
    },
    // 取得縣市郵遞區號資料
    getZipCode(state) {
      getZipCode().then((res) => {
        state.commit('SetStateData', {
          key: 'zipcode_data',
          val: res.data,
        });
      });
    },
    // 取得首頁大圖輪播資料
    getCarouselData(state) {
      getCarouselData().then((res) => {
        state.commit('SetStateData', {
          key: 'carousel_data',
          val: res.data,
        });
      });
    },
    // 取得最新消息分類資料
    getNewsCategoryData(state) {
      getNewsCategoryData().then((res) => {
        state.commit('SetStateData', {
          key: 'news_category_data',
          val: res.data,
        });
      });
    },
    // 取得最新消息資料
    getNewsData(state) {
      getNewsData().then((res) => {
        let tmp_data = res.data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
        });
        state.commit('SetStateData', {
          key: 'news_data',
          val: tmp_data,
        });
      });
    },
    // 取得商品分類與獨立銷售頁資料
    getCategoryData(state) {
      getCategoryData().then((res) => {
        // 依照後台設定的排序，排序資料
        let tmp_data = res.data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
        });

        // 篩選有設定限制時間，且已經超出時間範圍的資料
        tmp_data = tmp_data.filter((item) => {
          if (item.MenuTimeEnd != null) {
            return new Date() < new Date(item.MenuTimeEnd);
          } else {
            return true;
          }
        });

        // 商品分類為Content5不等於獨立銷售頁的資料
        const category = tmp_data.filter(
          (item) => item.Content5 != '獨立銷售頁'
        );
        state.commit('SetStateData', {
          key: 'category_data',
          val: category,
        });

        // 獨立銷售頁為Content5等於獨立銷售頁的資料
        const event = tmp_data.filter((item) => item.Content5 == '獨立銷售頁');
        state.commit('SetStateData', {
          key: 'event_data',
          val: event,
        });
      });
    },
    // 取得商品資料
    getProductData({ commit }) {
      getProductData().then((res) => {
        // 篩選已刪除商品
        let tmp_data = res.data.filter((item) => {
          return item.deleted_at == null;
        });
        // 篩選停用的庫存，並判斷若商品沒有圖片則顯示預設圖片
        tmp_data.forEach((item, item_index) => {
          tmp_data[item_index].Stock = item.Stock.filter(
            (stock) => stock.Status == 'Y'
          );
          if (item.Image1 == '') {
            tmp_data[item_index].Image1 = '/image/product_default.webp';
          }
        });
        // 篩選掉沒有庫存選項的一般商品
        tmp_data = tmp_data.filter(
          (item) => item.Stock.length > 0 || item.IsCustom == 'Y'
        );
        // 篩選停用的商品
        tmp_data = tmp_data.filter((item) => item.Status == 'Y');
        // 排序
        tmp_data = tmp_data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
        });
        commit('SetStateData', {
          key: 'all_product_data',
          val: res.data,
        });
        commit('SetStateData', {
          key: 'product_data',
          val: tmp_data,
        });
        commit('shopcart_module/SetProductData', tmp_data, {
          root: true,
        });
      });
    },
    // 取得常見問題資料
    getQuestionData(state) {
      getQuestionData().then((res) => {
        state.commit('SetStateData', {
          key: 'question_data',
          val: res.data,
        });
      });
    },
    // 取得常見問題分類資料
    getQuestionCategoryData(state) {
      getQuestionCategoryData().then((res) => {
        state.commit('SetStateData', {
          key: 'question_category_data',
          val: res.data,
        });
      });
    },
    // 取得付款方式
    getPaymentData(state) {
      getPaymentData().then((res) => {
        state.commit('SetStateData', {
          key: 'payment_data',
          val: res.data,
        });
      });
    },
    // 取得物流方式
    getShipwayData(state) {
      getShipwayData().then((res) => {
        state.commit('SetStateData', {
          key: 'shipway_data',
          val: res.data,
        });
      });
    },
  },
  modules: {
    shopcart_module: shopcart_module,
  },
});
