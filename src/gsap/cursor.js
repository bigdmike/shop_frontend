export class CursorMove {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    if (!('ontouchstart' in document.documentElement)) {
      window.addEventListener('mousemove', ($event) => {
        this.trackMove($event);
      });
      this.moveCursor();
    }
  }
  trackMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
  moveCursor() {
    let cursor = document.querySelector('#cursor_circle');
    let w = cursor.offsetWidth;
    let h = cursor.offsetHeight;
    let move_speed = 0.2;
    let dist1X = this.mouseX - this.cursorX;
    let dist1Y = this.mouseY - this.cursorY;
    this.cursorX = this.cursorX + dist1X * move_speed;
    this.cursorY = this.cursorY + dist1Y * move_speed;
    cursor.style.transform =
      'translate3D(' +
      (this.cursorX - w / 2) +
      'px,' +
      (this.cursorY - h / 2) +
      'px,0px)';
    requestAnimationFrame(() => this.moveCursor());
  }
  addTitleMark() {
    let cursor = document.querySelector('#cursor_circle');
    document.querySelectorAll('[data-cursor-title]').forEach((item) => {
      item.addEventListener('mouseover', () => {
        cursor.classList.add('title_hover');
      });
      item.addEventListener('mouseout', () => {
        cursor.classList.remove('title_hover');
      });
    });
  }
  addMoreMark() {
    let cursor = document.querySelector('#cursor_circle');
    document.querySelectorAll('[data-cursor-more]').forEach((item) => {
      item.addEventListener('mouseover', () => {
        cursor.classList.add('more_hover');
      });
      item.addEventListener('mouseout', () => {
        cursor.classList.remove('more_hover');
      });
    });
  }
  addLinkMark() {
    let cursor = document.querySelector('#cursor_circle');
    document.querySelectorAll('[data-cursor-link]').forEach((item) => {
      item.addEventListener('mouseover', () => {
        cursor.classList.add('link_hover');
      });
      item.addEventListener('mouseout', () => {
        cursor.classList.remove('link_hover');
      });
    });
  }
  refresh() {
    let cursor = document.querySelector('#cursor_circle');
    cursor.classList.remove('title_hover');
    cursor.classList.remove('more_hover');
    cursor.classList.remove('link_hover');
    this.addTitleMark();
    this.addMoreMark();
    this.addLinkMark();
  }
}
