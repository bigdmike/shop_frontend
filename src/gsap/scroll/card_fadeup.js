import { gsap } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class CardFadeUp extends Scroll {
  constructor(options) {
    super({
      scrub: null,
      ...options,
    });
    this.reset();
    this.setup();
  }

  reset() {
    this.els = document.querySelectorAll('[data-card-fadeup]');
    this.els.forEach((el) => {
      gsap.set(el, { opacity: 0 });
    });
  }

  setup(els = this.els, start_index = 0) {
    els.forEach((el, i) => {
      if (i >= start_index) {
        gsap.set(el, { opacity: 1 });
        const { scrollDelay, scrollDuration, scrollEase } = el.dataset;

        let tween = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            // toggleActions: 'play complete complete reverse',
            toggleActions: 'play play play play',
          },
          defaults: {
            duration: scrollDuration || 0.6,
            delay: scrollDelay,
            ease: scrollEase || 'power4.inOut',
          },
        });

        // card animation
        const card_animations = this.setCard(el);
        tween.add(card_animations, 0);

        this.tweens.push(tween);
      }
    });
  }

  setCard(el) {
    let animations_list = [];
    const { scrollDelay, scrollDuration, scrollEase, scrollGroup, scrollX } =
      el.dataset;
    const animation = gsap.fromTo(
      el,
      {
        opacity: 0,
        blur: 5,
        y: '30%',
        x: scrollX || '40%',
      },
      {
        opacity: 1,
        blur: 0,
        y: '0%',
        x: '0%',
        duration: scrollDuration || 1,
        delay: scrollDelay,
        ease: scrollEase || 'power4.inOut',
      },
      scrollGroup
    );
    animations_list.push(animation);

    const tween = this.addTimeline(animations_list, [el]);
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

  add(index) {
    let all_els = document.querySelectorAll('[data-card-fadeup]');
    this.setup(all_els, index);
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
