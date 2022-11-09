import { gsap } from '@/gsap/gsap_loader';

export class Loading {
  constructor() {
    this.tweens = [];
    this.loading_time = 0;
  }

  reset(el) {
    const dark_line = el.querySelectorAll('[data-dark-line]');
    const dark_dot = el.querySelectorAll('[data-dark-dot]');
    const light_dot = el.querySelectorAll('[data-light-dot]');
    const background = el.querySelectorAll('[data-loading-bg]');
    const content = el.querySelectorAll('[data-loading-content]');
    gsap.set(content, { opacity: 0 });
    gsap.set(background, { opacity: 0 });
    gsap.set(dark_line, { x: '-110%' });
    gsap.set(dark_dot, { x: '-110%' });
    gsap.set(light_dot, { x: '-110%' });
    while (this.tweens.length) {
      let tweens = this.tweens.pop();
      tweens == null ? '' : tweens.kill();
      tweens = null;
    }
    this.loading_time = 0;
  }

  loading(el) {
    this.reset(el);
    document.querySelector('body').style.overflow = 'hidden';
    this.tweens = [];
    const logo = el.querySelectorAll('[data-logo]');
    const circle_mask = el.querySelectorAll('[data-text-mask]');
    const dark_line = el.querySelectorAll('[data-dark-line]');
    const dark_dot = el.querySelectorAll('[data-dark-dot]');
    const light_dot = el.querySelectorAll('[data-light-dot]');
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
    let tween = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    tween
      .set(dark_line, {
        x: '-110%',
      })
      .set(dark_dot, {
        x: '-110%',
      })
      .set(light_dot, {
        x: '-110%',
      })
      .set(circle_mask, {
        cx: '75',
        cy: '35',
        r: '50',
      })
      .set(logo, {
        x: '33%',
        delay: 1,
      })
      .fromTo(
        dark_line,
        {
          x: '-105%',
        },
        {
          x: '0%',
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
        logo,
        {
          x: '33%',
        },
        {
          x: '0%',
        }
      )
      .fromTo(
        circle_mask,
        {
          cx: '75',
          cy: '35',
          r: '50',
        },
        {
          cx: '25',
          cy: '55',
          r: '0',
          duration: 1,
        }
      )
      .set(logo, {
        delay: 0.3,
      })
      .fromTo(
        dark_line,
        {
          x: '0%',
        },
        {
          x: '110%',
          duration: 0.3,
        },
        'reverse_dark'
      )
      .fromTo(
        dark_dot,
        {
          x: '0%',
        },
        {
          x: '110%',
          delay: 0.3,
          duration: 0.3,
        },
        'reverse_dark'
      )
      .fromTo(
        light_dot,
        {
          x: '0%',
        },
        {
          x: '105%',
          duration: 0.3,
        }
      )
      .fromTo(
        circle_mask,
        {
          cx: '55',
          cy: '75',
          r: '0',
        },
        {
          cx: '75',
          cy: '35',
          r: '50',
          duration: 0.5,
          onComplete: () => {
            this.loading_time += 1;
          },
        }
      );

    open_tween.add(tween);

    this.tweens.push(open_tween);
  }

  close(el) {
    this.reset(el);
    this.tweens = [];
    const content = el.querySelectorAll('[data-loading-content]');
    const background = el.querySelectorAll('[data-loading-bg]');
    let tween = gsap.timeline();

    tween
      .fromTo(
        content,
        {
          opacity: 1,
          blur: 0,
        },
        {
          opacity: 0,
          blur: 10,
          duration: 0.2,
        }
      )
      .fromTo(
        background,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.3,
        }
      )
      .set(el, {
        x: '-105%',
        onComplete: () => {
          document.querySelector('body').style.overflow = 'auto';
          this.reset(el);
        },
      });

    this.tweens.push(tween);
  }
}
