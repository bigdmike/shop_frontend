import { gsap, ScrollTrigger } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class FullScreenScroll extends Scroll {
  constructor(options) {
    super({
      scrub: null,
      ...options,
    });
    this.setup();
  }

  setup() {
    this.els = document.querySelectorAll('[data-scroll-fullscreen]');
    this.els.forEach((el, index) => {
      gsap.set(el, { opacity: 1 });
      //   const { scrollDelay, scrollDuration, scrollEase } = el.dataset;

      let tween = gsap.timeline();

      // title line animation
      const section_animations = this.setSection(el);
      tween.add(section_animations, 0);

      // title animation
      const bg_animations = this.setBg(el, index);
      tween.add(bg_animations, 0);

      this.tweens.push(tween);
    });
  }

  getRatio(el) {
    return window.innerHeight / (window.innerHeight + el.offsetHeight);
  }

  setSection(el) {
    let page_scroll = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      scrub: true,
      pin: true,
    });
    const tween = this.addTimeline([page_scroll], [el]);
    return tween;
  }

  setBg(el, index) {
    let bg_el = el.querySelector('.bg_image');
    let bg_scroll = gsap.fromTo(
      bg_el,
      {
        backgroundPosition: () =>
          index
            ? `50% ${window.innerHeight * this.getRatio(el)}px`
            : `50% ${window.innerHeight * this.getRatio(el)}px`,
      },
      {
        backgroundPosition: () =>
          `50% ${-window.innerHeight * (1 - this.getRatio(el))}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: () => (index ? 'top bottom' : 'top bottom'),
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true, // to make it responsive
        },
      }
    );
    const tween = this.addTimeline([bg_scroll], [el]);
    return tween;
  }

  addTimeline(animations_list, els, group_name = 'section') {
    let tween = gsap.timeline();
    animations_list.forEach((animation, index) => {
      const { scrollGroup } = els[index].dataset;
      tween.add(animation, scrollGroup || group_name);
    });
    return tween;
  }
  refresh() {
    while (this.tweens.length) {
      let tween = this.tweens.pop();
      // tween.scrollTrigger.kill(true);
      tween.kill();
      tween = null;
    }
    this.els = null;
    this.setup();
  }
}
