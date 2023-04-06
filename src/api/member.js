import { del, put, post, get } from '@/common/request';

//註冊
export function SendSignUpData(data) {
  return post('member/register', data);
}

//忘記密碼
export function resetPwdData(data) {
  return post('member/forgetPassword', data);
}

//登入
export async function sendLoginData(data) {
  return post('member/login', data);
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

//取得常用收件資訊與Email(結帳時使用)
export function getAddressAndEmail() {
  let member_info = get('member/my');
  let address_info = get('member/receiver');
  let promise_list = [member_info, address_info];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

// 取得常用收件資訊
export function getAddressData() {
  return get('member/receiver');
}
// 新增常用收件資訊
export function createReceiver(data) {
  return put('member/receiver', data);
}
// 刪除常用收件資訊
export function deleteReceiver(id) {
  return del('member/receiver/' + id);
}

// 取得追蹤商品
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
// 新增追蹤商品
export function CreateFavorite(id) {
  let data = {
    FavoriteGoodsID: id,
  };
  return put('member/favorite', data);
}
// 刪除追蹤商品
export function DeleteFavorite(id) {
  return del('member/favorite/' + id);
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
