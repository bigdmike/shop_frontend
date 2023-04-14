// 取得LocalStorage資料
export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

// 設定LocalStorage資料
export function setLocalStorage(key, val) {
  return localStorage.setItem(key, val);
}

// 刪除LocalStorage資料
export function delLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function logoutAccount() {
  localStorage.removeItem('shopcart');
  localStorage.removeItem('account_data');
  localStorage.removeItem('account_token');
  localStorage.removeItem('checkout_data');
  localStorage.removeItem('check_out_form');
}
