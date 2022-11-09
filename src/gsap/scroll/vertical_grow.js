import { gsap } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class VerticalGrow extends Scroll {
  constructor(options) {
    super({
      scrub: null,
      ...options,
    });
    this.setup();
  }

  setup() {
    this.els = document.querySelectorAll('[data-vertical-grow]');
    this.els.forEach((el) => {
      const { delay, duration, ease } = el.dataset;

      let tween = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          toggleActions: 'play play play play',
        },
        defaults: {
          duration: duration || 2,
          delay: delay,
          ease: ease || 'power4.inOut',
        },
      });

      // card animation
      const grow_animations = this.setGrow(el);
      tween.add(grow_animations, 0);

      this.tweens.push(tween);
    });
  }

  setGrow(el) {
    let animations_list = [];
    const { group } = el.dataset;
    const animation = gsap.fromTo(
      el,
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
      },
      group
    );
    animations_list.push(animation);

    const tween = this.addTimeline(animations_list, [el]);
    return tween;
  }

  addTimeline(animations_list, els, group_name = 'section') {
    let tween = gsap.timeline();
    animations_list.forEach((animation, index) => {
      const { group } = els[index].dataset;
      tween.add(animation, group || group_name);
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
