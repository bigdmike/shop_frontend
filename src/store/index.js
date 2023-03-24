import Vue from 'vue';
import Vuex from 'vuex';
import {
  getColumnData,
  getZipCode,
  getCarouselData,
  getNewsData,
  getPromoteData,
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
      status: false,
      content: '',
    },
    image_loaded: false,
    member_token: '',
    search_dialog: false,
    shopcart_drawer: false,
    loading: 0,
    body_lock: 0,
    common_column_data: null,
    carousel_data: null,
    news_data: null,
    news_category_data: null,
    promote_data: null,
    category_data: null,
    event_data: null,
    product_data: null,
    question_category_data: null,
    question_data: null,
    zipcode_data: null,
    payment_data: null,
    shipway_data: null,
    dealer_data: null,
  },
  getters: {
    data_load_finish(state) {
      if (
        state.common_column_data != null &&
        state.carousel_data != null &&
        state.news_data != null &&
        state.news_category_data != null &&
        state.promote_data != null &&
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
    getCommonColumn: (state) => (key) => {
      if (state.common_column_data == null) {
        return null;
      }
      const column_data = state.common_column_data.filter(
        (column) => column.Title == key
      );
      return column_data.length > 0 ? column_data[0].Content : '';
    },
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
    // news
    filter_news_data: (state) => (category_id) => {
      return category_id == ''
        ? state.news_data
        : state.news_data.filter((item) => item.NewsCategoryID == category_id);
    },
    active_news_data: (state) => (news_id) => {
      if (state.news_data == null) {
        return null;
      }
      const active_news_data = state.news_data.filter(
        (item) => item.NewsID == news_id
      );
      return active_news_data.length > 0 ? active_news_data[0] : 'error';
    },
    active_news_category_data: (state) => (category_id) => {
      const active_category = state.news_category_data.filter(
        (item) => item.NewsCategoryID == category_id
      );
      return active_category.length > 0 ? active_category[0] : 'error';
    },
    // product
    filter_category_data: (state) => (category_id) => {
      const category = state.category_data.filter(
        (item) => item.MenuID == category_id
      );

      return category.length > 0 ? category[0] : null;
    },
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
    SetImageLoaded(state, action) {
      state.image_loaded = action;
    },
    SetBodyLock(state, action) {
      state.body_lock + action < 0
        ? (state.body_lock = 0)
        : (state.body_lock += action);
    },
    SetShopcartDrawer(state, action) {
      state.shopcart_drawer = action;
    },
    SetLoading(state, action) {
      if (action == 1) {
        state.loading += 1;
      } else {
        state.loading > 0 ? (state.loading -= 1) : '';
      }
    },
    SetDialog(state, { status, content }) {
      state.main_dialog.status = status;
      state.main_dialog.content = content;
    },
    SetSearchDialog(state, status) {
      state.search_dialog = status;
    },
    SetStateData(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {
    getDealerData(state) {
      getDealerData().then((res) => {
        state.commit('SetStateData', {
          key: 'dealer_data',
          val: res.data,
        });
      });
    },
    getColumnData(state) {
      getColumnData().then((res) => {
        state.commit('SetStateData', {
          key: 'common_column_data',
          val: res.data,
        });
      });
    },
    getZipCode(state) {
      getZipCode().then((res) => {
        state.commit('SetStateData', {
          key: 'zipcode_data',
          val: res.data,
        });
      });
    },
    getCarouselData(state) {
      getCarouselData().then((res) => {
        state.commit('SetStateData', {
          key: 'carousel_data',
          val: res.data,
        });
      });
    },
    getNewsCategoryData(state) {
      getNewsCategoryData().then((res) => {
        state.commit('SetStateData', {
          key: 'news_category_data',
          val: res.data,
        });
      });
    },
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
    getPromoteData(state) {
      getPromoteData().then((res) => {
        state.commit('SetStateData', {
          key: 'promote_data',
          val: res.data,
        });
      });
    },
    getCategoryData(state) {
      getCategoryData().then((res) => {
        console.log(res.data);
        let tmp_data = res.data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
        });
        tmp_data = tmp_data.filter((item) => {
          if (item.MenuTimeEnd != null) {
            return new Date() < new Date(item.MenuTimeEnd);
          } else {
            return true;
          }
        });
        const category = tmp_data.filter(
          (item) => item.Content5 != '獨立銷售頁'
        );
        console.log(category);
        state.commit('SetStateData', {
          key: 'category_data',
          val: category,
        });
        const event = tmp_data.filter((item) => item.Content5 == '獨立銷售頁');
        state.commit('SetStateData', {
          key: 'event_data',
          val: event,
        });
      });
    },
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
        // 篩選沒有庫存選項的商品
        // tmp_data = tmp_data.filter((item) => item.Stock.length > 0);
        // 篩選停用的商品
        tmp_data = tmp_data.filter((item) => item.Status == 'Y');
        // 排序
        tmp_data = tmp_data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
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
    getQuestionData(state) {
      getQuestionData().then((res) => {
        state.commit('SetStateData', {
          key: 'question_data',
          val: res.data,
        });
      });
    },
    getQuestionCategoryData(state) {
      getQuestionCategoryData().then((res) => {
        state.commit('SetStateData', {
          key: 'question_category_data',
          val: res.data,
        });
      });
    },
    getPaymentData(state) {
      getPaymentData().then((res) => {
        state.commit('SetStateData', {
          key: 'payment_data',
          val: res.data,
        });
      });
    },
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
