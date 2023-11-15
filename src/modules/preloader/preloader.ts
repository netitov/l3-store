class Preloader  {
  preloader: HTMLElement | null;

  constructor() {
    this.preloader = document.querySelector('.preloader');
  }

  show() {
    this.preloader?.classList.add('preloader_active');
  }

  hide() {
    this.preloader?.classList.remove('preloader_active');
  }
}

export const preloader = new Preloader();
