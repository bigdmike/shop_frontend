import { gsap } from '@/gsap/gsap_loader';

export class product_card_parallax {
  constructor(el) {
    this.el = el;
    this.cards = el.querySelectorAll('[data-product-card]');

    this.timeline = [];
    this.matchMedia();
  }

  setupDesktop() {
    this.clear();
    this.cards.forEach((card) => {
      const image = card.querySelectorAll('[data-card-image]');
      const number = card.querySelectorAll('[data-card-number]');
      const content = card.querySelectorAll('[data-card-content]');

      const timeline = gsap.timeline({
        scrollTrigger: {
          scroller: '#app',
          trigger: card,
          start: 'top bottom',
          end: 'top 20%',
          toggleActions: 'restart play play reverse',
          scrub: true,
        },
      });
      timeline
        .fromTo(
          image,
          {
            y: '20%',
          },
          {
            y: '-20%',
            // ease: 'power3.inOut',
          },
          'same'
        )
        .fromTo(
          content,
          {
            y: '-20%',
          },
          {
            y: '20%',
          },
          'same'
        )
        .fromTo(
          number,
          {
            y: '25%',
          },
          {
            y: '-10%',
          },
          'same'
        );

      this.timeline.push(timeline);
    });
  }
  setupMobile() {
    this.clear();
    this.cards.forEach((card) => {
      const image = card.querySelectorAll('[data-card-image]');
      const number = card.querySelectorAll('[data-card-number]');
      const content = card.querySelectorAll('[data-card-content]');

      const timeline = gsap.timeline({
        scrollTrigger: {
          scroller: '#app',
          trigger: card,
          start: 'top bottom',
          end: 'top center',
          toggleActions: 'restart play play reverse',
          scrub: true,
        },
      });
      timeline
        .fromTo(
          image,
          {
            y: '20%',
          },
          {
            y: '-20%',
            // ease: 'power3.inOut',
          },
          'same'
        )
        .fromTo(
          content,
          {
            y: '20%',
          },
          {
            y: '-30%',
          },
          'same'
        )
        .fromTo(
          number,
          {
            y: '10%',
          },
          {
            y: '-20%',
          },
          'same'
        );

      this.timeline.push(timeline);
    });
  }

  matchMedia() {
    let mm = gsap.matchMedia(),
      breakPoint = 800;

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${
          breakPoint - 1
        }px) and (prefers-reduced-motion: no-preference)`,
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isMobile } = context.conditions;
        if (isMobile) {
          this.setupMobile();
        } else {
          this.setupDesktop();
        }

        //   tl = gsap.timeline({
        //     scrollTrigger: {
        //       trigger: ".gray",
        //       scrub: 1,
        //       end: "200%",
        //       pin: true
        //     }
        //   });
        // tl.to(target, {scale: 2, rotation: 360})
        // .to(target, {scale: 1});

        // works for non-ScrollTrigger animations too:
        // gsap.to(target, {backgroundColor: "#2c7ad2", duration: 0.8, ease: "none", repeat: -1, yoyo: true});

        return () => {
          // optionally return a cleanup function that will be called when the media query no longer matches
        };
      }
    );
  }

  clear() {
    this.timeline.forEach((item) => {
      item != null ? item.kill() : '';
    });
    this.timeline = [];
  }
}
