import { gsap } from '@/gsap/gsap_loader';

export class Landing {
  constructor() {
    this.tweens = [];
  }

  reset(el) {
    const dark_line = el.querySelectorAll('[data-dark-line]');
    const dark_dot = el.querySelectorAll('[data-dark-dot]');
    const light_dot = el.querySelectorAll('[data-light-dot]');
    const background = el.querySelectorAll('[data-loading-bg]');
    const content = el.querySelectorAll('[data-loading-content]');
    gsap.set(content, { opacity: 0 });
    gsap.set(background, { opacity: 0 });
    gsap.set(dark_line, { y: '-110%', opacity: 1 });
    gsap.set(dark_dot, { x: '-110%', opacity: 1 });
    gsap.set(light_dot, { x: '-110%', opacity: 1 });
    while (this.tweens.length) {
      let tweens = this.tweens.pop();
      tweens == null ? '' : tweens.kill();
      tweens = null;
    }
  }

  loading(el) {
    this.reset(el);
    document.querySelector('body').style.overflow = 'hidden';
    this.tweens = [];
    const dark_line = el.querySelectorAll('[data-dark-line]');
    const dark_dot = el.querySelectorAll('[data-dark-dot]');
    const light_dot = el.querySelectorAll('[data-light-dot]');
    const light_leaf = el.querySelectorAll('[data-light-leaf]')[1];
    const content = el.querySelectorAll('[data-loading-content]');
    const background = el.querySelectorAll('[data-loading-bg]');
    let open_tween = gsap.timeline();
    open_tween
      .set(el, {
        x: '100%',
      })
      .fromTo(
        background,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
      .set(content, {
        opacity: 1,
        blur: 0,
      });
    let tween = gsap.timeline();
    tween
      .set(dark_line, {
        y: '110%',
      })
      .set(dark_dot, {
        x: '-110%',
      })
      .set(light_dot, {
        x: '-110%',
      })
      .fromTo(
        dark_line,
        {
          y: '105%',
        },
        {
          y: '0%',
          duration: 0.5,
        },
        'dark'
      )
      .fromTo(
        dark_dot,
        {
          x: '-105%',
        },
        {
          x: '0%',
          duration: 0.5,
          delay: 0.3,
        },
        'dark'
      )
      .fromTo(
        light_dot,
        {
          x: '-105%',
        },
        {
          x: '0%',
          duration: 0.5,
        }
      )
      .fromTo(
        dark_line,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        'scale'
      )
      .fromTo(
        dark_dot,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        'scale'
      )
      .fromTo(
        light_dot[0],
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        'scale'
      )
      .fromTo(
        light_leaf,
        {
          scale: 1,
          transformOrigin: 'center',
        },
        {
          scale: 250,
          transformOrigin: 'center',
          duration: 0.4,
          delay: 0.4,
        },
        'scale'
      )
      .fromTo(
        light_dot[1],
        {
          fill: '#E2E868',
        },
        {
          fill: 'transparent',
          duration: 0.4,
          delay: 0.5,
        },
        'scale'
      )
      .fromTo(
        background,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        }
      )
      .set(el, {
        x: '0%',
        onComplete: () => {
          document.querySelector('body').style.overflow = 'auto';
        },
      });
    open_tween.add(tween);
    this.tweens.push(open_tween);
  }
}
