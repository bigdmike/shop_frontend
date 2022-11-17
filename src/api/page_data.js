import { get } from '@/common/request';

export function getCarouselData() {
  return get('/carousel');
}

export function getKolData() {
  return get('/kol');
}

export function getNewsData() {
  return get('/news');
}

export function getPromoteData() {
  return get('/promote');
}

export function getMascotData() {
  return get('/mascot');
}

export function getColumnData() {
  return get('/column');
}

export function getZipCode() {
  return get('/zipcode');
}

export function getNewsCategoryData() {
  return get('/news/category');
}

export function getParentCategoryData() {
  return get('/menu/category');
}

export function getCategoryData() {
  return get('/menu');
}

export function getProductData() {
  return get('/goods');
}
export function getSingleProductData(id) {
  return get(`/goods/${id}`);
}

export function getQuestionData() {
  return get('/question');
}

export function getQuestionCategoryData() {
  return get('/question/category');
}

export function getPaymentData() {
  return get('/payment');
}

export function getShipwayData() {
  return get('/shipping');
}
