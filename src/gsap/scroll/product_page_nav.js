import { gsap } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class ProductPageNav extends Scroll {
  constructor(el) {
    super();
    this.nav = el.querySelector('[data-nav]');
    this.fixed_nav = el.querySelector('[data-nav-fixed]');
    this.tween = null;
    this.setup();
  }

  reset() {
    gsap.set(this.fixed_nav, { x: '0%', opacity: 0 });
    this.tween != null ? this.tween.kill() : '';
    this.tween = null;
  }

  setup() {
    this.reset();
    this.tween = gsap.timeline({
      scrollTrigger: {
        trigger: this.nav,
        start: 'top 128',
        end: '',
        pin: this.fixed_nav,
        markers: true,
      },
    });
    this.tween.set({
      x: '-100%',
      opacity: 1,
    });
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
