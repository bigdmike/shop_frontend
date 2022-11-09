import { gsap } from '@/gsap/gsap_loader';

export class Dialog {
  constructor() {
    this.tweens = [];
  }

  reset() {
    while (this.tweens.length) {
      let tweens = this.tweens.pop();
      tweens == null ? '' : tweens.kill();
      tweens = null;
    }
  }

  open(el) {
    this.reset();
    this.tweens = [];
    const background = el.querySelectorAll('[data-dialog-background]');
    const content = el.querySelectorAll('[data-dialog-content]');
    let tween = gsap.timeline({});

    tween
      .set(el, { x: '100%' })
      .fromTo(
        background,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
      .fromTo(
        content,
        {
          opacity: 0,
          y: '10%',
        },
        {
          opacity: 1,
          y: '0%',
        }
      );

    this.tweens.push(tween);
  }

  close(el) {
    this.reset();
    this.tweens = [];
    const background = el.querySelectorAll('[data-dialog-background]');
    const content = el.querySelectorAll('[data-dialog-content]');
    let tween = gsap.timeline({});

    tween
      .fromTo(
        content,
        {
          opacity: 1,
          y: '0%',
        },
        {
          opacity: 0,
          y: '10%',
        }
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
      .set(el, { x: '0%' });

    this.tweens.push(tween);
  }

  addTimeline(animations_list, els, group_name = 'section') {
    let tween = gsap.timeline();
    animations_list.forEach((animation, index) => {
      const { group } = els[index].dataset;
      tween.add(animation, group || group_name);
    });
    return tween;
  }

  refresh() {
    while (this.tweens.length) {
      let tweens = this.tweens.pop();
      tweens == null ? '' : tweens.kill();
      tweens = null;
    }

    this.setup();
  }
}
