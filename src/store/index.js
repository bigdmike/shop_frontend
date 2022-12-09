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
} from '@/api/page_data.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    add_cart_message: false,
    main_dialog: {
      status: false,
      content: '',
    },
    member_token: '',
    shopcart: [],
    shopcart_drawer: false,
    loading: 0,
    body_lock: 0,
    common_column_data: null,
    carousel_data: null,
    news_data: null,
    news_category_data: null,
    promote_data: null,
    category_data: null,
    product_data: null,
    question_category_data: null,
    question_data: null,
    zipcode_data: null,
    payment_data: null,
    shipway_data: null,
  },
  mutations: {
    SetBodyLock(state, action) {
      state.body_lock + action < 0
        ? (state.body_lock = 0)
        : (state.body_lock += action);
    },
    SetShopcartDrawer(state, action) {
      state.shopcart_drawer = action;
    },
    SetAddCartMessage(state, action) {
      state.add_cart_message = action;
    },
    SetLoading(state, action) {
      if (action == 1) {
        state.loading += 1;
      } else {
        state.loading -= 1;
      }
    },
    SetDialog(state, { status, content }) {
      state.main_dialog.status = status;
      state.main_dialog.content = content;
    },
    SetShopCart(state, shopcart) {
      state.shopcart = shopcart;
    },
    SetStateData(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {
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
        let tmp_data = res.data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
        });
        state.commit('SetStateData', {
          key: 'category_data',
          val: tmp_data,
        });
      });
    },
    getProductData(state) {
      getProductData().then((res) => {
        let tmp_data = res.data.filter((item) => {
          return item.deleted_at == null;
        });
        tmp_data.forEach((item, item_index) => {
          tmp_data[item_index].Stock = item.Stock.filter(
            (stock) => stock.Status == 'Y'
          );
          if (item.Image1 == '') {
            tmp_data[item_index].Image1 = '/image/product_default.webp';
          }
        });
        tmp_data = tmp_data.filter((item) => item.Stock.length > 0);
        tmp_data = tmp_data.sort((a, b) => {
          return parseInt(a.Seq) - parseInt(b.Seq);
        });
        state.commit('SetStateData', {
          key: 'product_data',
          val: tmp_data,
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
});
