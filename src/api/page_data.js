import { get, post } from '@/common/request';

// 首頁輪播圖
export function getCarouselData() {
  return get('/carousel');
}
// 經銷資訊
export function getDealerData() {
  return get('/advertisement');
}
// 最新消息分類
export function getNewsCategoryData() {
  return get('/news/category');
}
// 最新消息
export function getNewsData() {
  return get('/news');
}
// 通用欄位
export function getColumnData() {
  return get('/column');
}
// 縣市郵遞區號
export function getZipCode() {
  return get('/zipcode');
}
// 商品大分類
export function getParentCategoryData() {
  return get('/menu/category');
}
// 商品次分類
export function getCategoryData() {
  return get('/menu');
}
// 商品列表資訊(不包含商品圖片與詳細資料)
export function getProductData() {
  return get('/goods');
}
// 取得單一商品資料
export function getSingleProductData(id) {
  return get(`/goods/${id}`);
}
// 常見問題
export function getQuestionData() {
  return get('/question');
}
// 常見問題分類
export function getQuestionCategoryData() {
  return get('/question/category');
}
// 付款方式
export function getPaymentData() {
  return get('/payment');
}
// 物流方式
export function getShipwayData() {
  return get('/shipping');
}
// 寄出聯絡表單
export function postContact(data) {
  const form = {
    Name: data.name,
    Phone: data.phone,
    Email: data.email,
    Comment: data.comment,
  };
  return post('/contactUs', form);
}
