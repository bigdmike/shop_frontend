import { gsap } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class SectionScroll extends Scroll {
  constructor(options) {
    super({
      scrub: null,
      ...options,
    });
    this.setup();
  }

  reset() {
    this.els.forEach((el) => {
      gsap.set(el, { opacity: 0 });
    });
  }

  setup() {
    this.els = document.querySelectorAll('[data-section-header]');
    this.reset();
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

      // title line animation
      const title_line_animations = this.setTitleLine(el);
      tween.add(title_line_animations, 0);

      // title animation
      const title_animations = this.setTitle(el);
      tween.add(title_animations, 0);

      // sub title animation
      const sub_title_animations = this.setSubTitle(el);
      tween.add(sub_title_animations, 0);

      // content line animation
      const content_line_animations = this.setContentLine(el);
      tween.add(content_line_animations, 0);

      // content line animation
      const content_animations = this.setContent(el);
      tween.add(content_animations, 0);

      this.tweens.push(tween);
    });
  }

  setTitle(el) {
    const els = el.querySelectorAll('[data-title]');
    let animations_list = [];
    els.forEach((el) => {
      const { scrollDelay, scrollDuration, scrollEase, scrollGroup } =
        el.dataset;
      const animation = gsap.fromTo(
        el,
        {
          y: '105%',
        },
        {
          y: '0%',
          duration: scrollDuration || 1,
          delay: scrollDelay || 0,
          ease: scrollEase || 'power4.inOut',
        },
        scrollGroup
      );
      animations_list.push(animation);
    });
    const tween = this.addTimeline(animations_list, els);
    return tween;
  }
  setTitleLine(el) {
    const els = el.querySelectorAll('[data-title-line]');
    let animations_list = [];
    els.forEach((el) => {
      const { scrollDelay, scrollDuration, scrollEase } = el.dataset;
      const animation = gsap.fromTo(
        el,
        {
          scaleX: 0,
          transformOrigin: 'left',
        },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: scrollDuration || 1.3,
          delay: scrollDelay,
          ease: scrollEase || 'power4.inOut',
        }
      );
      animations_list.push(animation);
    });
    const tween = this.addTimeline(animations_list, els, 'line');
    return tween;
  }
  setSubTitle(el) {
    const els = el.querySelectorAll('[data-sub-title]');
    let animations_list = [];
    els.forEach((el) => {
      const { scrollDelay, scrollDuration, scrollEase, scrollGroup } =
        el.dataset;
      const animation = gsap.fromTo(
        el,
        {
          y: '105%',
        },
        {
          y: '0%',
          duration: scrollDuration || 0.8,
          delay: scrollDelay || 0.2,
          ease: scrollEase || 'power4.inOut',
        },
        scrollGroup
      );
      animations_list.push(animation);
    });
    const tween = this.addTimeline(animations_list, els);
    return tween;
  }
  setContentLine(el) {
    const els = el.querySelectorAll('[data-content-line]');
    let animations_list = [];
    els.forEach((el) => {
      const { scrollDelay, scrollDuration, scrollEase, scrollGroup } =
        el.dataset;
      const animation = gsap.fromTo(
        el,
        {
          scaleX: 0,
          transformOrigin: 'left',
        },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: scrollDuration || 0.8,
          delay: scrollDelay,
          ease: scrollEase || 'power4.inOut',
        },
        scrollGroup
      );
      animations_list.push(animation);
    });
    const tween = this.addTimeline(animations_list, els, 'line');
    return tween;
  }
  setContent(el) {
    const els = el.querySelectorAll('[data-content]');
    let animations_list = [];
    els.forEach((el) => {
      const {
        scrollDelay,
        scrollDuration,
        scrollEase,
        scrollGroup,
        scrollX,
        scrollY,
      } = el.dataset;
      const animation = gsap.fromTo(
        el,
        {
          opacity: 0,
          x: scrollX || '10%',
          y: scrollY || '20%',
          blur: 5,
        },
        {
          opacity: 1,
          x: '0%',
          y: '0%',
          blur: 0,
          duration: scrollDuration || 1.3,
          delay: scrollDelay || 0.2,
          ease: scrollEase || 'power4.inOut',
        },
        scrollGroup
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
    this.setup();
  }
}
