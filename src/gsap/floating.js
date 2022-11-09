import { gsap } from '@/gsap/gsap_loader';

export class Floating {
  constructor() {
    this.setup();
  }

  setup() {
    this.tweens = [];
    this.els = document.querySelectorAll('[data-floating]');
    this.els.forEach((el) => {
      // const { delay, duration, ease } = el.dataset;

      let tween = gsap.timeline({
        defaults: {},
      });

      // card animation
      const grow_animations = this.setGrow(el);
      tween.add(grow_animations, 0);

      this.tweens.push(tween);
    });
  }

  setGrow(el) {
    let animations_list = [];
    const {
      group,
      minX,
      minY,
      maxX,
      maxY,
      repeatDelay,
      delay,
      duration,
      ease,
    } = el.dataset;
    const animation = gsap.to(
      el,
      {
        x: `random(${minX}, ${maxX} , 5)` + '%',
        y: `random(${minY}, ${maxY} , 5)` + '%',
        scale: 'random(1, 1.5)',
        repeatDelay: repeatDelay || 1.5,
        repeat: -1,
        repeatRefresh: true,
        duration: duration || 3,
        delay: delay,
        ease: ease || 'power2.inOut',
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
      let tweens = this.tweens.pop();
      tweens == null ? '' : tweens.kill();
      tweens = null;
    }

    this.setup();
  }
}
