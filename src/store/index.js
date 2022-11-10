import Vue from 'vue';
import Vuex from 'vuex';
import {
  getColumnData,
  getZipCode,
  getCarouselData,
  getKolData,
  getNewsData,
  getPromoteData,
  getMascotData,
  getNewsCategoryData,
  getParentCategoryData,
  getCategoryData,
  getProductData,
  getQuestionData,
  getQuestionCategoryData,
} from '@/api/page_data.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    add_cart_message: false,
    main_dialog: {
      status: false,
      title: '',
      content: '',
      type: '',
    },
    member_token: '',
    shopcart: [],
    loading: 0,
    common_column_data: null,
    carousel_data: null,
    kol_data: null,
    news_data: null,
    news_category_data: null,
    promote_data: null,
    parent_category_data: null,
    category_data: null,
    product_data: null,
    question_category_data: null,
    question_data: null,
    zipcode_data: null,
    mascot_data: null,
  },
  mutations: {
    SetAddCartMessage(state, action) {
      state.add_cart_message = action;
    },
    SetBodyLock(state, action) {
      let body = document.querySelector('body');
      action
        ? (body.style.overflowY = 'hidden')
        : (body.style.overflowY = 'auto');
    },
    SetLoading(state, action) {
      if (action == 1) {
        state.loading += 1;
      } else {
        state.loading -= 1;
      }
    },
    SetDialog(state, { status, content, title, type }) {
      state.main_dialog.status = status;
      state.main_dialog.content = content;
      state.main_dialog.title = title;
      state.main_dialog.type = type;
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
    getKolData(state) {
      getKolData().then((res) => {
        state.commit('SetStateData', {
          key: 'kol_data',
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
        state.commit('SetStateData', {
          key: 'news_data',
          val: res.data,
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
    getMascotData(state) {
      getMascotData().then((res) => {
        state.commit('SetStateData', {
          key: 'mascot_data',
          val: res.data,
        });
      });
    },
    getParentCategoryData(state) {
      getParentCategoryData().then((res) => {
        state.commit('SetStateData', {
          key: 'parent_category_data',
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
        let tmp_data = res.data.sort((a, b) => {
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
  },
});
