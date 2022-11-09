import { gsap } from '@/gsap/gsap_loader';
import { Scroll } from '@/gsap/scroll/rolling';

export class BgParallaxScroll extends Scroll {
  constructor(options) {
    super({
      scrub: null,
      ...options,
    });
    window.addEventListener('resize', () => {
      this.refresh();
    });
    this.setup();
  }

  setup() {
    this.els = document.querySelectorAll('[data-scroll-parallax]');
    this.els.forEach((el) => {
      const { scrollEase, parallaxY } = el.dataset;
      let tween = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true, // to make it responsive
        },
        defaults: {
          ease: scrollEase || 'power2.inOut',
        },
      });

      gsap.set(el, {
        backgroundPositionY: '0px',
      });
      tween.fromTo(
        el,
        {
          backgroundPositionY: '0px',
        },
        {
          backgroundPositionY: parallaxY,
        }
      );

      this.tweens.push(tween);
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
    this.setup();
  }
}
