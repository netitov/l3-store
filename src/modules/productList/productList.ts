import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { analyticsService } from '../../services/analytics.service';

export class ProductList {
  view: View;
  products: ProductData[];
  observer: IntersectionObserver;

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
    this.observer = new IntersectionObserver(this._observeProductView, { threshold: 0.5 });
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);

      this.observer.observe(productComp.view.root);
    });
  }

  private _observeProductView = (entries: IntersectionObserverEntry[], observer: any) => {
    entries.forEach((entry) => {
      
      if (entry.isIntersecting) {
        const productElement = entry.target as HTMLElement;

        const productId = Number(productElement.dataset.productId);
        const productData = this.products.find(i => i.id === productId);
        
        if (productData) {
          const eventType = productData && Object.keys(productData.log).length > 0 ? 'viewCardPromo' : 'viewCard';

          //fetch secret key
          fetch(`/api/getProductSecretKey?id=${productId}`)
            .then((res) => res.json())
            .then((secretKey) => {
              analyticsService.sendAlaytics(eventType, { ...productData, secretKey });
            })
            .then(() => observer.unobserve(entry.target))
        }
      } 
    });
  }

}
