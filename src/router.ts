import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';

const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp
};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        //check if it's not outer link
        if (href && new URL(href, window.location.href).origin === window.location.origin) {
          e.preventDefault();
          history.pushState(null, '', href);
          this.route();
        }
      }
    });
  }

  route() {

    // @ts-ignore
    const component = ROUTES[window.location.pathname] || notFoundComp;

    component.attach(this.$appRoot);
    component.render();
  }
}

