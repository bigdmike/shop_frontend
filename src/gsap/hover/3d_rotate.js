import gsap from 'gsap';

export class ThreeDRotate {
  constructor() {
    this.els = [];
    this.setup();
  }

  setup() {
    this.els = document.querySelectorAll('[data-hover-3d]');

    // window.addEventListener('mousemove', (event) => {
    //   this.els.forEach((el) => {
    //     var xPos = event.clientX / window.innerHeight,
    //       yPos = event.clientY / window.innerWidth,
    //       box = el;

    //     xPos -= 0.5;
    //     yPos -= 0.5;

    //     gsap.to(box, 1, {
    //       rotationY: xPos * 100,
    //       rotationX: yPos * 150,
    //       ease: 'Power1.easeOut',
    //     });
    //   });
    // });
    this.els.forEach((el) => {
      el.addEventListener('mousemove', (event) => {
        let rect = el.getBoundingClientRect(),
          centerX = rect.left + (rect.right - rect.left) / 2,
          centerY = rect.top + (rect.bottom - rect.top) / 2,
          posX = (centerX - event.clientX) / (rect.right - rect.left),
          posY = (event.clientY - centerY) / (rect.bottom - rect.top);
        //   tiltx = (event.pageY - centerY) / centerY,
        //   tilty = -((event.pageX - centerX) / centerX),
        //   radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2)),
        //   degree = radius * 40;
        // gsap.to(el, {
        //   transform:
        //     'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
        //   ease: 'Power2.easeOut',
        // });

        // event.clientY > centerY ? (posX *= -1) : '';
        gsap.to(el, {
          rotateX: posX * 50,
          rotateY: posY * 50,
          z: 30,
          ease: 'Power1.easeOut',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          transform: 'rotate3d(0, 0, 0, 0deg)',
          rotateX: 0,
          rotateY: 0,
          ease: 'Power1.easeOut',
        });
      });
    });
  }
}
