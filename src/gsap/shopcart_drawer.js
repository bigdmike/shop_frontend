import { gsap } from '@/gsap/gsap_loader';
export class shopcart_drawer_animation {
  constructor(el) {
    this.el = el;
    this.white_background = this.el.querySelectorAll('[data-menu-bg]');
    this.menu = this.el.querySelectorAll('[data-menu]');
    this.tween = null;
  }

  reset() {
    gsap.set(this.el, { x: 0 });
    gsap.set(this.menu, { x: '0%', opacity: 0 });
    gsap.set(this.white_background, { x: '100%', opacity: 0 });
    this.tween != null ? this.tween.kill() : '';
    this.tween = null;
  }

  open() {
    this.tween != null ? this.tween.kill() : '';
    this.tween = gsap.timeline();

    this.tween
      .set(this.el, {
        x: '-100%',
      })
      .set(this.white_background, {
        x: '0%',
      })
      .to(
        this.white_background,
        {
          opacity: 1,
        },
        'menu_show'
      )
      .to(
        this.menu,
        {
          x: '-100%',
          opacity: 1,
          // delay: 0.3,
        },
        'menu_show'
      );
  }

  close() {
    this.tween != null ? this.tween.kill() : '';
    this.tween = gsap.timeline();

    this.tween
      .to(
        this.menu,
        {
          x: '100%',
          opacity: 0,
        },
        'menu_show'
      )
      .to(this.white_background, { opacity: 0 }, 'menu_show')
      .set(this.white_backgroundel, {
        x: '0%',
      })
      .set(this.el, {
        x: '0%',
      });
  }
}
