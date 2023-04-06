import store from '@/store/index.js';
import { getLocalStorage } from '@/common/cookie.js';
import { get, post, put, del } from '@/common/request.js';

// 取得結帳資訊
export function getCashier(coupon = '', payment = 0, shipping = 0, shopcart) {
  let data = {
    CouponCode: coupon, //優惠代碼
    PaymentID: payment, //付款方式
    ShippingID: shipping, //物流方式
    ShoppingCart: [], //購物車內容
  };
  // 依照傳入的購物車資訊提取API需要的資料放入ShoppingCart中
  shopcart.forEach((item) => {
    for (let i = 0; i < item.amount; i++) {
      if (item.is_custom == 'Y') {
        data.ShoppingCart.push({
          GoodsID: item.product_data.GoodsID, //商品ID
          CustomSpecID: item.active_option.join(), //規格ID組合
        });
      } else {
        data.ShoppingCart.push({
          GoodsID: item.product_data.GoodsID, //商品ID
          ColorID: item.active_option[0], //選項一ID
          SizeID: item.active_option[1], //選項二ID
        });
      }
    }
  });

  if (getLocalStorage('account_token')) {
    // 會員API
    return post('member/cashier', data);
  } else {
    // 無會員API
    return post('nonMember/cashier', data);
  }
}

// 送出結帳
export function SendCheckout(user_data, shopcart) {
  // 篩選郵遞區號
  const zip_code = store.state.zipcode_data.filter(
    (item) =>
      item.City == user_data.consignee_city &&
      item.Area == user_data.consignee_area
  )[0].ZipCode;

  let data = {
    BuyerName: user_data.buyer_last_name + user_data.buyer_first_name, //購買者姓名
    BuyerPhone: user_data.buyer_phone, //購買者電話
    ReceiverName:
      user_data.consignee_last_name + user_data.consignee_first_name, //收件人姓名
    ReceiverPhone: user_data.consignee_phone, //收件人電話
    ReceiverEmail: user_data.consignee_email, //收件人Email
    ReceiverAddressCode: zip_code, //收件郵遞區號
    ReceiverAddress: user_data.consignee_address, //收件地址
    ReceiverMemo: user_data.comment, //訂單備註
    CouponCode: user_data.coupon, //優惠代碼
    PaymentID: user_data.pay_way, //付款方式
    ShippingID: user_data.ship_way, //物流方式
    ReceiverStoreNo: '', //超商取貨ID
    ReceiverStoreInfo: '', //超商取貨門市資訊
    OrderMemo: '', //分潤標籤
    ShoppingCart: [], //購物車
  };

  // 如果是超商取貨
  if (data.ShippingID == 1 || data.ShippingID == 2) {
    data.ReceiverStoreNo = user_data.shop_id;
    data.ReceiverStoreInfo = user_data.shop_name;
  }
  // 如果有分潤標籤
  if (getLocalStorage('order_memo')) {
    data.OrderMemo = getLocalStorage('order_memo');
  }

  // 依照傳入的購物車資訊提取API需要的資料放入ShoppingCart中
  shopcart.forEach((item) => {
    for (let i = 0; i < item.amount; i++) {
      if (item.is_custom == 'Y') {
        data.ShoppingCart.push({
          GoodsID: item.product_data.GoodsID,
          CustomSpecID: item.active_option.join(),
        });
      } else {
        data.ShoppingCart.push({
          GoodsID: item.product_data.GoodsID,
          ColorID: item.active_option[0],
          SizeID: item.active_option[1],
        });
      }
    }
  });

  if (getLocalStorage('account_token')) {
    // 會員API
    return post('member/checkout', data);
  } else {
    // 無會員API
    return post('nonMember/checkout', data);
  }
}

// 取得7-11門市地圖
export function Get711Map() {
  if (getLocalStorage('member_token')) {
    //有會員API
    return get('member/711Map');
  } else {
    //無會員API
    return get('nonMember/711Map');
  }
}

// 取得全家門市地圖
export function GetFamilyMap() {
  if (getLocalStorage('member_token')) {
    //有會員API
    return get('member/FamilyMap');
  } else {
    //無會員API
    return get('nonMember/FamilyMap');
  }
}

// 非會員查詢訂單
export function GetOrder(trade_id, phone) {
  let data = {
    TradeID: trade_id, //訂單編號
    BuyerPhone: phone, //訂購人電話
  };
  return post('nonMember/trade', data);
}

// 會員加入購物車
export function AddShopCart(product, amount) {
  let promise_list = [];
  // 因為加入購物車API一次只能傳入一個商品，所以要依照使用者選擇的商品數量，數量有幾個API就要呼叫幾次
  for (let i = 0; i < amount; i++) {
    promise_list.push(put('member/shoppingCart', product));
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

// 會員移除購物車商品
export function RemoveShopCart(remove_list) {
  let promise_list = [];
  // 因為移除購物車API一次只能傳入一個商品，所以要依照使用者選擇的商品數量，數量有幾個API就要呼叫幾次
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

// 取得會員購物車資料
export function GetShopCart() {
  return get('member/shoppingCart');
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
