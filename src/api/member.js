import { del, put, post, get } from '@/common/request';
import {
  delCookie,
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
// 登出
export function LogOut() {
  delCookie('member_token');
  return true;
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
export function removeShopcart(id) {
  return del('member/shoppingCart/' + id);
}

// 會員資料
export function GetAccountInfo() {
  return get('member/my');
}

export function SendAccountInfo(data) {
  return post('member/my', data);
}

export function ModifyPassword(data) {
  return post('member/password', data);
}

export function ResetPassword(account) {
  return post('member/forgetPassword', {
    Account: account,
  });
}

//常用收件資訊
export function CreateReceiver(data) {
  return put('member/receiver', data);
}
export function DeleteReceiver(id) {
  return del('member/receiver/' + id);
}
export function getReceiverData() {
  var receiver = get('member/receiver');
  var zipcode = get('zipcode');

  let promise_list = [receiver, zipcode];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
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

//訂單查詢
export function GetOrderList() {
  let payment = get('payment');
  let ship = get('shipping');
  let member = get('member/trade');
  let products = get('/goods');
  let promise_list = [payment, ship, member, products];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}

//訂單重新付款
export function GetRePay(trade_id) {
  return get('member/trade/payment/' + trade_id);
}
