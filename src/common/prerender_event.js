import router from '@/router/index';
export function ReturnErrorPage() {
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'prerender-status-code');
  meta.content = '404';
  document.getElementsByTagName('head')[0].appendChild(meta);
  router.push('/error_page');
  this.meta_title = '頁面不存在 | 泳欣設計 | YongXin Design';
  this.meta_content =
    '您查詢的頁面已移除或是不存在，您可以返回網站首頁查看其他頁面，有任何疑問請與我們聯繫。';
  this.meta_cover = 'https://www.yongxin-design.com/img/share/index.jpg';
  window.prerenderReady = true;
}
