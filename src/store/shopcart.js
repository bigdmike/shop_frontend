import { AddShopCart, GetShopCart, RemoveShopCart } from '@/api/shopcart';
import {
  setLocalStorage,
  getLocalStorage,
  delLocalStorage,
} from '@/common/cookie';

const GetShopCartItemIndex = (state, { product, options }) => {
  let index = -1;
  state.shopcart.forEach((item, item_index) => {
    if (item.product_data.GoodsID == product.GoodsID) {
      if (
        item.active_option[0] === options[0] &&
        item.active_option[1] === options[1]
      ) {
        index = item_index;
      }
    }
  });
  return index;
};

const GetProductIndex = (state, product_id) => {
  let index = -1;
  state.product_data.forEach((item, item_index) => {
    item.GoodsID == product_id ? (index = item_index) : '';
  });
  return index;
};

const CheckActiveOption = ({ product, options }, is_custom) => {
  console.log({ product, options }, is_custom);
  if (is_custom == 'Y') {
    let error = false;
    options.forEach((option) => {
      const spec = product.CustomSpecList.filter(
        (item) => item.CustomSpecID == option
      );
      // console.log(spec.length <= 0, spec[0].SpecStatus == 'N');
      if (spec.length <= 0) {
        error = true;
      } else if (spec[0].SpecStatus == 'N') {
        error = true;
      }
    });

    return error ? 'error' : '';
  } else {
    const stock = product.Stock.filter((item) => {
      return item.ColorID == options[0] && item.SizeID == options[1];
    });

    return stock.length > 0 ? stock[0] : 'error';
  }
};

const SetLocalShopCart = (shopcart) => {
  let tmp_list = '';
  console.log(shopcart);

  shopcart.forEach((item, item_index) => {
    item_index != 0 ? (tmp_list += ';') : '';
    if (item.is_custom == 'Y') {
      // 客製化商品
      let spec_list_text = '';
      item.active_option.forEach((spec, spec_index) => {
        spec_index != 0 ? (spec_list_text += '-') : '';
        spec_list_text += spec;
      });
      tmp_list += `${item.product_data.GoodsID},Y,${spec_list_text},${item.amount}`;
    } else {
      // 一般商品
      tmp_list += `${item.product_data.GoodsID},N,${item.active_option[0]}-${item.active_option[1]},${item.amount}`;
    }
  });
  console.log(tmp_list);
  tmp_list == ''
    ? delLocalStorage('shopcart')
    : setLocalStorage('shopcart', tmp_list);
};

const shopcart_module = {
  namespaced: true,
  state: () => ({
    shopcart: [],
    product_data: null,
    add_cart_message: false,
  }),
  getters: {},
  actions: {
    async AddShopCart(
      { dispatch, commit },
      { product, options, amount, show_message = false }
    ) {
      let shop_cart_item = {
        GoodsID: product.GoodsID,
      };
      if (product.IsCustom == 'N') {
        shop_cart_item.ColorID = options[0];
        shop_cart_item.SizeID = options[1];
      } else {
        // shop_cart_item.ColorID = -1;
        // shop_cart_item.SizeID = -1;
        shop_cart_item.CustomSpecID = options.join();
      }
      const add_result = await AddShopCart(shop_cart_item, amount);
      if (add_result.code == 302) {
        // token 過期，先清空購物車再新增至本地購物車
        commit('SetShopCart', []);
        commit('AddShopCart', {
          product: product,
          options: options,
          amount: amount,
        });
      } else {
        // 2.call 取得購物車 api 並存入 store
        dispatch('GetShopCart');
        show_message ? commit('SetAddCartMessage', true) : '';
      }
    },
    async RemoveShopCart({ state, dispatch, commit }, { index, amount }) {
      let remove_list = [];
      if (amount == -1) {
        remove_list = state.shopcart[index].shopcart_id;
      } else {
        for (let i = 0; i < amount; i++) {
          remove_list.push(state.shopcart[index].shopcart_id[i]);
        }
      }

      const remove_result = await RemoveShopCart(remove_list);
      if (remove_result.code == 302) {
        // token 過期，清空購物車
        commit('SetShopCart', []);
      } else {
        // 移除商品後，重新取得目前購物車
        dispatch('GetShopCart');
      }
    },
    GetShopCart({ dispatch }) {
      if (getLocalStorage('account_token')) {
        GetShopCart().then(async (res) => {
          if (res.code == 302) {
            dispatch('GetLocalShopCart');
          } else {
            dispatch('ConvertShopCart', res.data);
          }
        });
      } else {
        dispatch('GetLocalShopCart');
      }
    },
    GetLocalShopCart({ state, commit }) {
      // 從localStorage 讀出購物車
      let shop_cart_text = getLocalStorage('shopcart');
      // 暫存購物車
      let tmp_list = [];

      if (shop_cart_text) {
        // 若有讀出購物車，則依照規則轉換成陣列
        shop_cart_text = shop_cart_text.split(';');

        shop_cart_text.forEach((item) => {
          // 購物車物品資料
          const shopcart_item = item.split(',');
          // 商品資料
          const product_data = state.product_data.filter(
            (item) => item.GoodsID == shopcart_item[0]
          );
          if (product_data.length > 0) {
            // 檢查庫存是否存在
            const stock_data = {
              product: product_data[0],
              options: shopcart_item[2].split('-'),
            };

            let option_status = CheckActiveOption(stock_data, shopcart_item[1]);

            if (option_status != 'error') {
              tmp_list.push({
                product_data: product_data[0],
                is_custom: shopcart_item[1],
                active_option: shopcart_item[2].split('-'),
                amount: parseInt(shopcart_item[3]),
                shopcart_id: [],
              });
            }
          }
        });
      }
      commit('SetShopCart', tmp_list);
    },
    ConvertShopCart({ dispatch, commit, state }, shopcart) {
      // 暫存購物車
      let tmp_list = [];
      // 不存在的商品
      let delete_list = [];

      console.log(shopcart);

      shopcart.forEach((item) => {
        const product_index = GetProductIndex(state, item.GoodsID);

        if (product_index != -1) {
          const product_data = state.product_data[product_index];
          let shop_cart_item = {
            product: product_data,
            options: [],
          };
          if (product_data.IsCustom == 'N') {
            shop_cart_item.options = [item.ColorID, item.SizeID];
          } else {
            shop_cart_item.options = item.CustomSpecID.split(',');
          }

          // 檢查選項是否存在
          const option_status = CheckActiveOption(
            shop_cart_item,
            product_data.IsCustom
          );
          // 檢查是否存在相同商品，客製化商品不疊加
          const shop_cart_item_index =
            product_data.IsCustom == 'N'
              ? GetShopCartItemIndex({ shopcart: tmp_list }, shop_cart_item)
              : -1;

          if (option_status == 'error') {
            // 若商品選項已不存在，則新增至待刪除清單
            delete_list.push(item);
          } else if (shop_cart_item_index == -1) {
            // 如果商品不存在，則新增進暫存購物車
            let tmp_shopcart_item = {
              product_data: product_data,
              active_option: [],
              is_custom: product_data.IsCustom,
              amount: 1,
              shopcart_id: [item.ShoppingCartID],
            };
            if (product_data.IsCustom == 'N') {
              tmp_shopcart_item.active_option = [item.ColorID, item.SizeID];
            } else {
              tmp_shopcart_item.active_option = item.CustomSpecID.split(',');
            }
            tmp_list.push(tmp_shopcart_item);
          } else {
            // 如果商品存在，則增加數量
            tmp_list[shop_cart_item_index].amount += 1;
            tmp_list[shop_cart_item_index].shopcart_id.push(
              item.ShoppingCartID
            );
          }
        } else {
          // 若商品已不存在，則新增至待刪除清單
          delete_list.push(item);
        }
      });

      // 移除不存在的商品後，設定購物車
      delete_list.length > 0
        ? dispatch('RemoveShopCart', delete_list)
        : commit('SetShopCart', tmp_list);
    },
  },
  mutations: {
    AddShopCart(
      state,
      { product, options, amount, is_custom, show_message = false }
    ) {
      // 搜尋購物車中相同商品的位置，若無相同商品則返回-1
      const product_index = GetShopCartItemIndex(state, {
        product: product,
        options: options,
      });

      if (product_index == -1) {
        // 若商品不存在則新增
        const shopcart_item = {
          product_data: product,
          active_option: options,
          is_custom: is_custom,
          amount: amount,
          shopcart_id: [],
        };
        state.shopcart.push(shopcart_item);
      } else {
        // 若商品存在則增加數量
        state.shopcart[product_index].amount = parseInt(
          state.shopcart[product_index].amount
        );
        state.shopcart[product_index].amount += 1;
      }
      SetLocalShopCart(state.shopcart);
      show_message ? (state.add_cart_message = true) : '';
    },
    RemoveShopCart(state, { index, amount }) {
      if (amount == -1) {
        // 若數量為-1則直接將該商品移除
        state.shopcart.splice(index, 1);
      } else {
        // 若數量不為-1則扣除指定的數量
        state.shopcart[index].amount =
          parseInt(state.shopcart[index].amount) - parseInt(amount);
        // 若扣除數量後商品數量小於等於0，則移除該商品
        state.shopcart[index].amount <= 0
          ? state.shopcart.splice(index, 1)
          : '';
      }
      SetLocalShopCart(state.shopcart);
    },
    SetShopCart(state, shopcart) {
      state.shopcart = shopcart;
      SetLocalShopCart(shopcart);
    },
    SetProductData(state, product_data) {
      state.product_data = product_data;
    },
    SetAddCartMessage(state, action) {
      state.add_cart_message = action;
    },
  },
};

export { shopcart_module };
