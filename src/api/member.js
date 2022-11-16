import { del, put, post, get } from '@/common/request';
import {
  delLocalStorage,
  //   getLocalStorage,
} from '@/common/cookie.js';
// import {
//     cookieToArray,
//     shopcartO2O,
//     getShopCart
// } from "@/api/shopcart.js"

//註冊
export function SendSignUpData(data) {
  return post('member/register', data);
}

//登入
export async function sendLoginData(data) {
  // 登入會員後
  return post('member/login', data).then((res) => {
    return res;
  });
}
// 取得會員購物車
export function getShopcart() {
  return get('member/shoppingCart');
}
// 新增會員購物車
export function addShopcart(shopcart) {
  let promise_list = [];
  shopcart.forEach((item) => {
    let product = {
      GoodsID: item.product_data.GoodsID,
      ColorID: item.active_option[0],
      SizeID: item.active_option[1],
    };
    for (let i = 0; i < item.amount; i++) {
      promise_list.push(put('member/shoppingCart', product));
    }
  });

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        delLocalStorage('shopcart');
        let error = false;
        res.forEach((item) => {
          item.code != 200 ? (error = item) : '';
        });
        if (error != false) {
          return error;
        } else {
          return res[0];
        }
      }
    },
    (err) => console.log(err)
  );
}
// 移除會員購物車
export function removeShopcart(id) {
  return del('member/shoppingCart/' + id);
}

// 取得會員資料
export function getAccountInfo() {
  return get('member/my');
}
// 更新會員資料
export function updateAccountInfo(data) {
  return post('member/my', data);
}
// 更新會員密碼
export function updateAccountPassword(data) {
  return post('member/password', data);
}

//訂單查詢
export function getOrderList() {
  return get('member/trade');
}

//常用收件資訊
export function getAddressData() {
  return get('member/receiver');
}
export function createReceiver(data) {
  return put('member/receiver', data);
}
export function deleteReceiver(id) {
  return del('member/receiver/' + id);
}

// 追蹤商品
export function getFavoriteData() {
  var favorite = get('member/favorite');
  var products = get('/goods');

  let promise_list = [products, favorite];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

export function CreateFavorite(id) {
  let data = {
    FavoriteGoodsID: id,
  };
  return put('member/favorite', data);
}

export function DeleteFavorite(id) {
  return del('member/favorite/' + id);
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}

//訂單重新付款
export function GetRePay(trade_id) {
  return get('member/trade/payment/' + trade_id);
}
