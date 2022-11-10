import { gsap } from '@/gsap/gsap_loader';
import store from '@/store/index';
export class shopcart_dialog_gsap_animation {
  constructor(el) {
    this.el = el;
    this.background = this.el.querySelectorAll('[data-dialog-bg]');
    this.dialog = this.el.querySelectorAll('[data-dialog-box]');
    this.progress = this.el.querySelectorAll('[data-dialog-progress]');
    this.tween = null;
  }

  reset() {
    gsap.set(this.el, { x: 0 });
    gsap.set(this.background, { opacity: 0 });
    gsap.set(this.dialog, { y: '50px', opacity: 0 });
    gsap.set(this.progress, { scaleX: 0 });
    this.tween != null ? this.tween.kill() : '';
    this.tween = null;
  }

  open() {
    this.reset();
    this.tween != null ? this.tween.kill() : '';
    this.tween = gsap.timeline();

    this.tween
      .set(this.el, {
        x: '-100%',
      })
      .to(
        this.background,
        {
          opacity: 1,
        },
        'menu_show'
      )
      .to(
        this.dialog,
        {
          y: '0px',
          opacity: 1,
          delay: 0.3,
        },
        'menu_show'
      )
      .to(
        this.progress,
        {
          scaleX: 1,
          duration: 3,
          onComplete: () => {
            this.close();
          },
        },
        'menu_show'
      );
  }

  close() {
    this.tween != null ? this.tween.kill() : '';
    this.tween = gsap.timeline();
    this.tween
      .to(
        this.dialog,
        {
          y: '0px',
          opacity: 0,
        },
        'menu_show'
      )
      .to(
        this.background,
        {
          opacity: 0,
        },
        'menu_show'
      )
      .set(this.el, {
        x: '0%',
        onComplete: () => {
          store.commit('SetAddCartMessage', false);
        },
      });
  }
}
