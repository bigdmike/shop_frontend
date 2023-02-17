import { gsap } from '@/gsap/gsap_loader';
export class menu_gsap_animation {
  constructor(el) {
    this.el = el;
    this.white_background = this.el.querySelectorAll('[data-menu-bg]');
    this.menu = this.el.querySelectorAll('[data-menu]');
    this.tween = null;
  }

  reset() {
    gsap.set(this.el, { x: 0 });
    gsap.set(this.menu, { opacity: 0 });
    gsap.set(this.white_background[0], { y: '-30%', x: '-30%', opacity: 0 });
    gsap.set(this.white_background[1], { y: '30%', x: '30%', opacity: 0 });
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
      .to(
        this.white_background[0],
        {
          y: '0%',
          x: '0%',
          opacity: 1,
        },
        'menu_show'
      )
      .to(
        this.white_background[1],
        {
          y: '0%',
          x: '0%',
          opacity: 1,
        },
        'menu_show'
      )
      .to(
        this.menu,
        {
          opacity: 1,
          delay: 0.3,
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
          opacity: 0,
        },
        'menu_show'
      )
      .to(
        this.white_background[0],
        { y: '-30%', x: '-30%', opacity: 0 },
        'menu_show'
      )
      .to(
        this.white_background[1],
        { y: '30%', x: '30%', opacity: 0 },
        'menu_show'
      )
      .set(this.el, {
        x: '0%',
      });
  }
}
