import store from '@/store/index.js';
import { getLocalStorage } from '@/common/cookie.js';

import { get, post } from '@/common/request.js';

// cahiser
export function getCashier(coupon = '', payment = 0, shipping = 0, shopcart) {
  let data = {
    CouponCode: coupon,
    PaymentID: payment,
    ShippingID: shipping,
    ShoppingCart: [],
  };
  shopcart.forEach((item) => {
    for (let i = 0; i < item.amount; i++) {
      data.ShoppingCart.push({
        GoodsID: item.product_data.GoodsID,
        ColorID: item.active_option[0],
        SizeID: item.active_option[1],
      });
    }
  });
  if (getLocalStorage('member_token')) {
    return post('member/cashier', data);
  } else {
    return post('nonMember/cashier', data);
  }
}

// checkout
export function sendCheckout(user_data, shopcart) {
  let data = {
    ReceiverName: user_data.receiver_info.name,
    ReceiverPhone: user_data.receiver_info.phone,
    ReceiverEmail: user_data.receiver_info.email,
    ReceiverAddressCode: user_data.receiver_info.zip_code,
    ReceiverAddress: user_data.receiver_info.address,
    ReceiverStoreNo: user_data.shop.id,
    ReceiverStoreInfo: user_data.shop.name,
    ReceiverMemo: user_data.order_comment,
    CouponCode: user_data.coupon,
    PaymentID: user_data.payway,
    ShippingID: user_data.shipway,
    ShoppingCart: [],
  };
  shopcart.forEach((item) => {
    for (let i = 0; i < item.amount; i++) {
      data.ShoppingCart.push({
        GoodsID: item.product_id,
        ColorID: item.color_id,
        SizeID: item.size_id,
      });
    }
  });
  if (getLocalStorage('member_token')) {
    return post('member/checkout', data);
  } else {
    return post('nonMember/checkout', data);
  }
}

export function covertFullShopCart(shopcart) {
  return get('/goods').then((res) => {
    let products = res.data;
    shopcart.forEach((item) => {
      item.product_data = products.filter(
        (product) => product.GoodsID == item.product_id
      )[0];
    });
    store.commit('SetShopCart', shopcart);
    return shopcart;
  });
}

// shop map

export function Get711Map() {
  if (getLocalStorage('member_token')) {
    return get('member/711Map');
  } else {
    return get('nonMember/711Map');
  }
}

export function GetFamilyMap() {
  if (getLocalStorage('member_token')) {
    return get('member/FamilyMap');
  } else {
    return get('nonMember/FamilyMap');
  }
}
