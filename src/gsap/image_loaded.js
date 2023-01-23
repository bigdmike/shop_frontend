import gsap from 'gsap';
import store from '@/store/index';
export function LoadImage() {
  //初始化
  store.commit('SetImageLoaded', false);
  const images = gsap.utils.toArray('img');

  //完成事件
  const showDemo = () => {
    //設定讀取完成
    store.commit('SetImageLoaded', true);
    console.log('all images have been loaded!');
  };
  window.imagesLoaded(images).on('always', showDemo);
}
