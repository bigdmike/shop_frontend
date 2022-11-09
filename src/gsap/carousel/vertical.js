import { gsap } from '@/gsap/gsap_loader';

export class VerticalCarousel {
  constructor() {
    this.els = [];
    this.timer = [];
    this.active_index = [];
    this.timeline = [];
  }

  setup() {
    this.els = document.querySelectorAll('[data-vertical-carousel]');
    this.els.forEach((el) => {
      this.timer.push(null);
      this.timeline.push(null);
      this.active_index.push(0);

      const { carouselReverse, carouselCount } = el.dataset;

      if (carouselReverse) {
        let origin = carouselCount * 33.3333 * -1;
        gsap.set(el, {
          y: origin + '%',
        });
      } else {
        gsap.set(el, {
          y: '0%',
        });
      }
    });
    this.activeCarousel();
  }

  activeCarousel() {
    this.els.forEach((el, index) => {
      this.timer[index] != null ? clearTimeout(this.timer[index]) : '';
      this.timeline[index] != null ? this.timeline[index].kill() : '';
      this.timeline[index] = gsap.timeline();
      let distance = 0;
      const { carouselReverse, carouselCount } = el.dataset;

      if (this.active_index[index] == 1 && carouselReverse) {
        this.timeline[index].set(el, {
          y: '0%',
        });
      } else if (this.active_index[index] == 1) {
        let origin = carouselCount * 33.3333 * -1;
        this.timeline[index].set(el, {
          y: origin + '%',
        });
      }

      if (carouselReverse) {
        distance = this.active_index[index] * 33.3333 * -1;
      } else {
        distance = (carouselCount - this.active_index[index]) * 33.3333 * -1;
      }

      this.timeline[index].to(el, {
        y: distance + '%',
      });

      this.active_index[index] == carouselCount - 1
        ? (this.active_index[index] = 1)
        : (this.active_index[index] += 1);
      this.timer[index] = setTimeout(() => {
        this.activeCarousel();
      }, 3000);
    });
  }

  refresh() {
    while (this.timer.length) {
      let timer = this.timer.pop();
      clearTimeout(timer);
      timer = null;
      let timeline = this.timeline.pop();
      timeline == null ? '' : timeline.kill();
      timeline = null;
      this.active_index.pop();
    }
    this.els = null;

    this.setup();
  }
}
