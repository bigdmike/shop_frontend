import { gsap } from '@/gsap/gsap_loader';

export class news_list_gsap {
  constructor(el, news_list) {
    this.el = el;
    this.news_card = el.querySelectorAll('[data-carousel-item]');
    this.card_cover = el.querySelectorAll('[data-carousel-cover]');
    this.card_date = el.querySelectorAll('[data-carousel-date]');
    this.card_title = el.querySelectorAll('[data-carousel-title]');
    this.card_content = el.querySelectorAll('[data-carousel-content]');
    this.card_link = el.querySelectorAll('[data-carousel-link]');

    this.data_count = news_list.length;
    this.active_index = 0;
    this.carousel_timeline = null;
    this.scroll_timeline = null;
    this.carousel_timer = null;
    this.focus = false;
    this.setScroll();
  }

  setScroll() {
    this.scroll_timeline != null ? this.scroll_timeline.kill() : '';
    this.scroll_timeline = gsap.timeline({
      scrollTrigger: {
        scroller: '#app',
        trigger: this.el,
        start: 'top 60%',
        toggleActions: 'restart play play reverse',
        onEnter: () => {
          this.focus = true;
          this.setCarouselTimer();
        },
        onLeave: () => {
          this.focus = false;
          this.carousel_timer != null ? clearTimeout(this.carousel_timer) : '';
        },
        onEnterBack: () => {
          this.focus = true;
          this.setCarouselTimer();
        },
        onLeaveBack: () => {
          this.focus = false;
          this.carousel_timer != null ? clearTimeout(this.carousel_timer) : '';
        },
      },
    });

    gsap.set(
      this.card_cover,
      {
        opacity: 1,
      },
      'same'
    );
    gsap.set(
      this.card_date,
      {
        y: '105%',
        opacity: 0,
      },
      'same'
    );
    gsap.set(
      this.card_title,
      {
        y: '105%',
        opacity: 0,
      },
      'same'
    );
    gsap.set(
      this.card_content,
      {
        y: '105%',
        opacity: 0,
      },
      'same'
    );
    gsap.set(
      this.card_link,
      {
        x: '-105%',
        opacity: 0,
      },
      'same'
    );

    gsap.set(
      this.card_cover[0],
      {
        opacity: 0,
      },
      'same'
    );
    gsap.set(
      this.card_date[0],
      {
        y: '0%',
        opacity: 1,
      },
      'same'
    );
    gsap.set(
      this.card_title[0],
      {
        y: '0%',
        opacity: 1,
      },
      'same'
    );
    gsap.set(
      this.card_content[0],
      {
        y: '0%',
        opacity: 1,
      },
      'same'
    );
    gsap.set(
      this.card_link[0],
      {
        x: '0%',
        opacity: 1,
      },
      'same'
    );
  }

  setCarouselTimer() {
    this.carousel_timer != null ? clearTimeout(this.carousel_timer) : '';
    if (this.focus) {
      this.carousel_timer = setTimeout(() => {
        this.active_index == this.data_count - 1
          ? (this.active_index = 0)
          : (this.active_index += 1);
        this.setNextCarousel();
      }, 5000);
    }
  }

  setNextCarousel() {
    this.carousel_timer != null ? clearTimeout(this.carousel_timer) : '';
    this.carousel_timeline != null ? this.carousel_timeline.kill() : '';
    this.carousel_timeline = gsap.timeline();

    this.carousel_timeline
      .to(
        this.card_cover,
        {
          opacity: 1,
        },
        'same'
      )
      .to(
        this.card_date,
        {
          y: '105%',
          opacity: 0,
        },
        'same'
      )
      .to(
        this.card_title,
        {
          y: '105%',
          opacity: 0,
        },
        'same'
      )
      .to(
        this.card_content,
        {
          y: '105%',
          opacity: 0,
        },
        'same'
      )
      .to(
        this.card_link,
        {
          x: '-105%',
          opacity: 0,
        },
        'same'
      )
      .to(
        this.news_card,
        {
          x: `${this.active_index * -100}%`,
          onComplete: () => {
            this.setCarouselTimer();
          },
        },
        'same'
      )

      .to(
        this.card_cover[this.active_index],
        {
          opacity: 0,
        },
        'show'
      )
      .to(
        this.card_date[this.active_index],
        {
          y: '0%',
          opacity: 1,
        },
        'show'
      )
      .to(
        this.card_title[this.active_index],
        {
          y: '0%',
          opacity: 1,
        },
        'show'
      )
      .to(
        this.card_content[this.active_index],
        {
          y: '0%',
          opacity: 1,
        },
        'show'
      )
      .to(
        this.card_link[this.active_index],
        {
          x: '0%',
          opacity: 1,
        },
        'show'
      );
  }

  prev() {
    this.carousel_timer != null ? clearTimeout(this.carousel_timer) : '';
    this.active_index == 0
      ? (this.active_index = this.data_count - 1)
      : (this.active_index -= 1);
    this.setNextCarousel();
  }
  next() {
    this.carousel_timer != null ? clearTimeout(this.carousel_timer) : '';
    this.active_index == this.data_count - 1
      ? (this.active_index = 0)
      : (this.active_index += 1);
    this.setNextCarousel();
  }
}
