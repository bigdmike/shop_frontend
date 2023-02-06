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

import { shopcart_module } from './shopcart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    main_dialog: {
      status: false,
      content: '',
    },
    member_token: '',
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
        state.shipway_data != null
      ) {
        return true;
      } else {
        return false;
      }
    },
    promote_product_data(state) {
      if (state.product_data == null) {
        return null;
      }
      return state.product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => {
            return menu.MenuID == 7;
          }).length > 0
        );
      });
    },
    new_product_data(state) {
      if (state.product_data == null) {
        return null;
      }
      const menu_id = state.category_data.filter(
        (item) => item.Title == '最新商品'
      )[0].MenuID;
      return state.product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => {
            return menu.MenuID == menu_id;
          }).length > 0
        );
      });
    },
    home_ad_data(state, getters) {
      let images = [];
      images.push({
        Image1: getters.getCommonColumn('home_promote_1_image'),
        Link: getters.getCommonColumn('home_promote_1_link'),
      });
      images.push({
        Image1: getters.getCommonColumn('home_promote_2_image'),
        Link: getters.getCommonColumn('home_promote_2_link'),
      });
      images.push({
        Image1: getters.getCommonColumn('home_promote_3_image'),
        Link: getters.getCommonColumn('home_promote_3_link'),
      });
      return images;
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
      console.log(new Date(), new Date(event_data[0].MenuTimeEnd));
      console.log(new Date() > new Date(event_data[0].MenuTimeEnd));
      if (new Date() > new Date(event_data[0].MenuTimeEnd)) {
        return 'error';
      }
      return event_data.length > 0 ? event_data[0] : 'error';
    },
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
        const category = tmp_data.filter(
          (item) => item.Content5 != '獨立銷售頁'
        );
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
        tmp_data = tmp_data.filter((item) => item.Stock.length > 0);
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
