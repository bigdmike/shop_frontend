import { gsap } from '@/gsap/gsap_loader';

export class home_carousel_timeline {
  constructor(el) {
    this.el = el;
    this.now_number = el
      .querySelectorAll('[data-number-box]')[0]
      .querySelectorAll('span');
    this.next_number = el
      .querySelectorAll('[data-number-box]')[1]
      .querySelectorAll('span');
    this.progress_horizontal = el.querySelector('[data-progress-horizontal]');
    this.progress_vertical = el.querySelector('[data-progress-vertical]');
    this.timeline = null;
    this.setup();
  }

  setup() {
    gsap.set(this.now_number, {
      y: '0%',
    });
    gsap.set(this.next_number, {
      y: '-100%',
    });
    gsap.set(this.progress_horizontal, {
      scaleX: 0,
    });
    gsap.set(this.progress_vertical, {
      scaleY: 0,
    });
  }

  next(now_index, next_index) {
    this.timeline != null ? this.timeline.kill() : '';
    this.timeline = gsap.timeline();

    this.timeline
      .fromTo(
        this.progress_horizontal,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 5,
          ease: 'none',
        },
        'same'
      )
      .fromTo(
        this.progress_vertical,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 5,
          ease: 'none',
        },
        'same'
      )
      .to(
        this.now_number,
        {
          y: `${now_index * -100}%`,
          ease: 'none',
        },
        'same'
      )
      .to(
        this.next_number,
        {
          y: `${next_index * -100}%`,
          ease: 'none',
        },
        'same'
      );
  }
}
