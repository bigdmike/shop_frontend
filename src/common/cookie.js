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
