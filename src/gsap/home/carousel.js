import { gsap } from '@/gsap/gsap_loader';

export class carousel_pin_scroll {
  constructor(el) {
    this.el = el;
    this.timeline = null;
    // this.setup();
  }

  setup() {
    this.timeline != null ? this.timeline.kill() : '';
    this.timeline = gsap.timeline({
      scrollTrigger: {
        scroller: '#app',
        trigger: this.el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        // pin: this.el,
      },
    });
    this.timeline.fromTo(
      this.el,
      {
        y: '0%',
      },
      {
        y: '100%',
        ease: 'none',
      }
    );
  }
}
