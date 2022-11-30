import router from '@/router';

export function redirectErrorPage() {
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'prerender-status-code');
  meta.content = '404';
  document.getElementsByTagName('head')[0].appendChild(meta);
  router.push('/error_page');
  window.prerenderReady = true;
}
