import { gsap, ScrollTrigger } from '@/gsap/gsap_loader';
import store from '@/store/index';
import LocomotiveScroll from 'locomotive-scroll';

export class ImageLoader {
  constructor() {
    this.locoScroll = null;
    this.resize_timer = null;
  }

  LoadImage() {
    store.commit('SetImageLoaded', false);
    store.commit('SetLoading', 1);
    console.log('set load image');
    const images = gsap.utils.toArray('img');
    window.removeEventListener('resize', this.refreshScroll, true);
    window.imagesLoaded(images).on('always', () => {
      window.addEventListener('resize', this.refreshScroll, true);
      this.LoadFinish();
    });
  }

  LoadFinish() {
    //設定讀取完成
    store.commit('SetImageLoaded', true);
    console.log('all images have been loaded!');
    console.log(document.querySelector('#app').clientHeight);
    console.log(this.locoScroll);
    // this.locoScroll == null ? this.SetScroller() : this.locoScroll.update();
    // this.SetScroller();
    // this.locoScroll.update();
    store.commit('SetLoading', -1);
  }

  SetScroller() {
    console.log('here');
    this.Destroy();
    this.locoScroll = new LocomotiveScroll({
      el: document.querySelector('#app'),
      smooth: true,
      // smoothMobile: true,
      // getDirection: true,
      mobile: {
        smooth: true,
        breakpoint: 0,
        multiplier: 3,
      },
      tablet: {
        breakpoint: 0,
        smooth: true,
        multiplier: 3,
      },
    });

    new ResizeObserver(() => this.locoScroll.update()).observe(
      document.querySelector('#app')
    );

    this.locoScroll.on('scroll', ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy('#app', {
      scrollTop: (value) => {
        return arguments.length
          ? this.locoScroll.scrollTo(value, 0, 0)
          : this.locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector('#app').style.transform
        ? 'transform'
        : 'fixed',
    });
    ScrollTrigger.refresh();
    store.commit('SetLoading', -1);
  }

  refreshScroll() {
    console.log('ScrollTrigger refresh');
    this.resize_timer != null ? clearTimeout(this.resize_timer) : '';
    this.resize_timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  }

  Destroy() {
    this.locoScroll != null ? this.locoScroll.destroy() : '';
  }
}

// export function LoadImage() {
//   //初始化
//   store.commit('SetImageLoaded', false);
//   const images = gsap.utils.toArray('img');

//   //完成事件
//   const showDemo = () => {
//     //設定讀取完成
//     store.commit('SetImageLoaded', true);
//     console.log('all images have been loaded!');
//     const locoScroll = new LocomotiveScroll({
//       el: document.querySelector('#app'),
//       smooth: true,
//       // smoothMobile: true,
//       // getDirection: true,
//     });

//     locoScroll.on('scroll', ScrollTrigger.update);

//     // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
//     ScrollTrigger.scrollerProxy('#app', {
//       scrollTop(value) {
//         return arguments.length
//           ? locoScroll.scrollTo(value, 0, 0)
//           : locoScroll.scroll.instance.scroll.y;
//       }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//       // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//       pinType: document.querySelector('#app').style.transform
//         ? 'transform'
//         : 'fixed',
//     });

//     ScrollTrigger.refresh();
//   };
//   window.imagesLoaded(images).on('always', showDemo);
// }
