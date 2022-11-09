import { gsap } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class CoverBoxScroll extends Scroll {
  constructor(options) {
    super({
      scrub: null,
      ...options,
    });
    this.reset();
    this.setup();
  }

  reset() {
    this.els = document.querySelectorAll('[data-cover-box]');
    this.els.forEach((el) => {
      const covers = el.querySelectorAll('[data-cover]');
      covers.forEach((cover) => {
        gsap.set(cover, { opacity: 0 });
      });
      gsap.set(el, { opacity: 0 });
    });
  }

  setup() {
    this.els.forEach((el) => {
      gsap.set(el, { opacity: 1 });
      const { scrollDelay, scrollDuration, scrollEase } = el.dataset;

      let tween = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          toggleActions: 'play play play play',
        },
        defaults: {
          duration: scrollDuration || 0.6,
          delay: scrollDelay,
          ease: scrollEase || 'power4.inOut',
        },
      });

      // cover animation
      const cover_animations = this.setCover(el);
      tween.add(cover_animations, 0);

      // cover content animation
      const cover_content_animations = this.setCoverContent(el);
      tween.add(cover_content_animations, 0);

      this.tweens.push(tween);
    });
  }

  setCover(el) {
    const els = el.querySelectorAll('[data-cover]');
    let animations_list = [];
    els.forEach((el) => {
      const {
        scrollInDelay,
        scrollInDuration,
        scrollInEase,
        scrollOutDelay,
        scrollOutDuration,
        scrollOutEase,
      } = el.dataset;
      const animation = gsap
        .timeline()
        .set(el, {
          x: '105%',
          opacity: 1,
        })
        .fromTo(
          el,
          {
            x: '105%',
          },
          {
            x: '0%',
            duration: scrollInDuration || 0.8,
            delay: scrollInDelay || 0,
            ease: scrollInEase || 'expo.inOut',
          },
          'cover_in'
        )
        .fromTo(
          el,
          {
            x: '0%',
          },
          {
            x: '-100%',
            duration: scrollOutDuration || 0.6,
            delay: scrollOutDelay || 0,
            ease: scrollOutEase || 'expo.inOut',
          },
          'cover_out'
        );
      animations_list.push(animation);
    });
    const tween = this.addTimeline(animations_list, els);
    return tween;
  }
  setCoverContent(el) {
    const els = el.querySelectorAll('[data-cover-content]');
    let animations_list = [];
    els.forEach((el) => {
      const { scrollDelay, scrollDuration, scrollEase } = el.dataset;
      const animation = gsap.fromTo(
        el,
        {
          y: '105%',
        },
        {
          y: '0%',
          duration: scrollDuration || 1,
          delay: scrollDelay,
          ease: scrollEase || 'expo.inOut',
        }
      );
      animations_list.push(animation);
    });
    const tween = this.addTimeline(animations_list, els);
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
      tween.scrollTrigger.kill(true);
      tween.kill();
      tween = null;
    }
    this.els = null;
    this.reset();
    this.setup();
  }
}
