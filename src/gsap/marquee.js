import gsap from 'gsap';
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
  trialWarn: false,
  units: {
    left: '%',
    top: '%',
    rotation: 'rad',
  },
});
export class marquee {
  constructor() {
    this.marquee_box = document.querySelectorAll('[data-marquee-box]');
    this.tweens = [];
    this.setup();
  }

  setup() {
    this.destroy();
    this.marquee_box.forEach((box) => {
      const { duration, direction } = box.dataset;
      const marquee_items = box.querySelectorAll('[data-marquee-item]');

      const tween = gsap.timeline();
      tween.fromTo(
        marquee_items,
        {
          x: direction == 'right' ? '-100%' : '0%',
        },
        {
          x: direction == 'right' ? '0%' : '-100%',
          duration: duration || 2,
          ease: 'none',
          repeat: -1,
        }
      );
      this.tweens.push(tween);
    });
  }

  destroy() {
    while (this.tweens.length) {
      let tween = this.tweens.pop();
      tween.kill();
      tween = null;
    }
  }
}
