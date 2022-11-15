import { gsap } from '@/gsap/gsap_loader';

export class dialog_animation {
  constructor(el) {
    this.el = el;
    this.background = el.querySelector('[data-dialog-bg]');
    this.dialog_box = el.querySelector('[data-dialog-box]');
    this.timeline = null;
  }

  reset() {
    this.timeline != null ? this.timeline.kill() : '';
    this.timeline = null;
    gsap.set(this.el, { x: '0%' });
    gsap.set(this.background, { opacity: 0 });
    gsap.set(this.dialog_box, { y: '50px', opacity: 0 });
  }

  open() {
    this.reset();
    this.timeline = gsap.timeline();

    this.timeline
      .set(this.el, {
        x: '-100%',
      })
      .fromTo(
        this.background,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
      .fromTo(
        this.dialog_box,
        {
          opacity: 0,
          y: '50px',
        },
        {
          opacity: 1,
          y: '0px',
        }
      );
  }

  close() {
    this.timeline != null ? this.timeline.reverse() : '';
  }
}
