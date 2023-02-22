import { gsap } from '@/gsap/gsap_loader';

export class related_section_gsap {
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
  }

  setNextCarousel() {
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
    this.active_index == 0
      ? (this.active_index = this.data_count - 1)
      : (this.active_index -= 1);
    this.setNextCarousel();
  }
  next() {
    this.active_index == this.data_count - 1
      ? (this.active_index = 0)
      : (this.active_index += 1);
    this.setNextCarousel();
  }
}
