import { gsap } from '@/gsap/gsap_loader';

export class section_animation {
  constructor(el) {
    this.el = el;
    this.title = el.querySelector('[data-section-title]');
    this.sub_title = el.querySelectorAll('[data-section-subtitle]');
    this.sub_title_arrow = el.querySelectorAll('[data-section-subtitle-arrow]');
    this.content = el.querySelectorAll('[data-section-content]');
    this.timeline = null;
    this.setup();
  }

  setup() {
    this.timeline != null ? this.timeline.kill() : '';
    this.timeline = gsap.timeline({
      scrollTrigger: {
        scroller: '#app',
        trigger: this.el,
        start: 'top 70%',
        toggleActions: 'restart play play reverse',
      },
    });
    // .fromTo(
    //   this.title,
    //   {
    //     text: '',
    //   },
    //   {
    //     text: this.title.dataset.text,
    //     duration: 1,
    //   },
    //   'same'
    // )

    this.timeline
      .fromTo(
        this.title,
        {
          // y: '105%',
          // skewY: '30deg',
          text: '',
          transformOrigin: 'left top',
        },
        {
          // y: '0%',
          // skewY: '0deg',
          text: this.title.dataset.text,
          transformOrigin: 'left top',
          duration: 0.6,
        },
        'first'
      )
      .fromTo(
        this.sub_title_arrow[0],
        {
          x: '100%',
          opacity: 0,
        },
        {
          x: '0%',
          opacity: 1,
          delay: 0.5,
        },
        'first'
      )
      .fromTo(
        this.sub_title_arrow[1],
        {
          x: '-100%',
          opacity: 0,
        },
        {
          x: '0%',
          opacity: 1,
          delay: 0.5,
        },
        'first'
      )
      .fromTo(
        this.sub_title,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'third'
      )
      .fromTo(
        this.content,
        {
          opacity: 0,
          y: '10%',
        },
        {
          opacity: 1,
          y: '0%',
        },
        'third'
      );
  }
}
