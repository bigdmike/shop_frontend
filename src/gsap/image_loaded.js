import gsap from 'gsap';
import store from '@/store/index';
export function LoadImage() {
  //初始化
  store.commit('SetImageLoaded', false);
  // store.commit('SetLoading', 1);
  // document.body.style.overflow = 'hidden';
  const images = gsap.utils.toArray('img');
  //   const loader = document.querySelector('.loader--text');

  //進度條
  // const updateProgress = (instance) => {
  //   // console.log(instance, (instance.progressedCount * 100) / images.length);
  //   // loader.innerHTML = `${Math.round(
  //   //   (instance.progressedCount * 100) / images.length
  //   // )}`;
  // };

  //完成事件
  const showDemo = () => {
    // store.commit('SetLoading', -1);
    //復原body
    // document.body.style.overflow = 'auto';
    // window.scrollTo(0, 0);

    //設定讀取完成
    store.commit('SetImageLoaded', true);
    console.log('all images have been loaded!');
  };
  window.imagesLoaded(images).on('always', showDemo);
  // .on('progress', updateProgress)
}
