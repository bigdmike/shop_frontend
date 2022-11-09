import { gsap } from '@/gsap/gsap_loader';

export class Loading {
  constructor() {
    this.tweens = [];
    this.loading_time = 0;
  }

  reset(el) {
    const dark_line = el.querySelectorAll('[data-dark-line]');
    const content = el.querySelectorAll('[data-loading-content]');
    const dark_dot = el.querySelectorAll('[data-dark-dot]');
    const light_dot = el.querySelectorAll('[data-light-dot]');
    const background = el.querySelectorAll('[data-loading-bg]');
    gsap.set(content, { opacity: 0 });
    gsap.set(background, { opacity: 0 });
    gsap.set(dark_line, { y: '110%', x: '0%' });
    gsap.set(dark_dot, { x: '-110%', opacity: 0 });
    gsap.set(light_dot, { x: '-110%', opacity: 0 });
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
    const content = el.querySelectorAll('[data-loading-content]');
    const logo = el.querySelectorAll('[data-logo]');
    const dark_line = el.querySelectorAll('[data-dark-line]');
    const dark_dot = el.querySelectorAll('[data-dark-dot]');
    const light_dot = el.querySelectorAll('[data-light-dot]');
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
      });
    let tween = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    tween
      .set(dark_line, {
        y: '110%',
        stagger: 0.1,
      })
      .set(dark_dot, {
        x: '-110%',
        opacity: 0,
      })
      .set(light_dot, {
        x: '-110%',
        opacity: 0,
      })
      .fromTo(
        dark_line,
        {
          y: '105%',
        },
        {
          y: '0%',
          stagger: 0.1,
          duration: 0.5,
        },
        'dark'
      )
      .fromTo(
        dark_dot,
        {
          x: '-105%',
          opacity: 0,
        },
        {
          x: '0%',
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          delay: 0.3,
        },
        'dark'
      )
      .fromTo(
        light_dot,
        {
          x: '-105%',
          opacity: 0,
        },
        {
          x: '0%',
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
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
