import store from '@/store/index.js';
import { getLocalStorage } from '@/common/cookie.js';
import { get, post, put, del } from '@/common/request.js';

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
  if (getLocalStorage('account_token')) {
    return post('member/cashier', data);
  } else {
    return post('nonMember/cashier', data);
  }
}

// checkout
export function SendCheckout(user_data, shopcart) {
  // 取出郵遞區號
  const zip_code = store.state.zipcode_data.filter(
    (item) =>
      item.City == user_data.consignee_city &&
      item.Area == user_data.consignee_area
  )[0].ZipCode;
  let data = {
    ReceiverName:
      user_data.consignee_last_name + user_data.consignee_first_name,
    ReceiverPhone: user_data.consignee_phone,
    ReceiverEmail: user_data.consignee_email,
    ReceiverAddressCode: zip_code,
    ReceiverAddress: user_data.consignee_address,
    ReceiverMemo: user_data.comment,
    CouponCode: user_data.coupon,
    PaymentID: user_data.pay_way,
    ShippingID: user_data.ship_way,
    ReceiverStoreNo: '',
    ReceiverStoreInfo: '',
    ShoppingCart: [],
  };
  // 如果是超商取貨
  if (data.ShippingID == 1 || data.ShippingID == 2) {
    data.ReceiverStoreNo = user_data.shop_id;
    data.ReceiverStoreInfo = user_data.shop_name;
  }

  shopcart.forEach((item) => {
    for (let i = 0; i < item.amount; i++) {
      data.ShoppingCart.push({
        GoodsID: item.product_data.GoodsID,
        ColorID: item.active_option[0],
        SizeID: item.active_option[1],
      });
    }
  });
  if (getLocalStorage('account_token')) {
    return post('member/checkout', data);
  } else {
    return post('nonMember/checkout', data);
  }
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

export function GetOrder(trade_id, phone) {
  let data = {
    TradeID: trade_id,
    ReceiverPhone: phone,
  };
  return post('nonMember/trade', data);
}

export function AddShopCart(product, amount) {
  let promise_list = [];
  // eslint-disable-next-line no-unused-vars
  for (let i = 0; i < amount; i++) {
    promise_list.push(put('member/shoppingCart', product));
  }

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        // delLocalStorage('shopcart');
        let error = false;
        res.forEach((item) => {
          item.code != 200 ? (error = item) : '';
        });
        return error != false ? error : res[0];
      }
    },
    (err) => console.log(err)
  );
}

export function RemoveShopCart(remove_list) {
  let promise_list = [];
  // eslint-disable-next-line no-unused-vars
  for (let i = 0; i < remove_list.length; i++) {
    promise_list.push(del('member/shoppingCart/' + remove_list[i]));
  }
  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        let error = false;
        res.forEach((item) => {
          item.code != 200 ? (error = item) : '';
        });
        return error != false ? error : res[0];
      }
    },
    (err) => console.log(err)
  );
}

export function GetShopCart() {
  return get('member/shoppingCart');
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
