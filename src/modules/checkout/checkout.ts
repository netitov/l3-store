import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import { preloader } from '../preloader/preloader';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    preloader.show();
    this.view.cart.innerHTML = '';
    try {
      this.products = await cartService.get();

      if (this.products.length < 1) {
        this.view.root.classList.add('is__empty');
        return;
      }

      this.products.forEach((product) => {
        const productComp = new Product(product, { isHorizontal: true });
        productComp.render();
        productComp.attach(this.view.cart);
      });

      const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
      this.view.price.innerText = formatPrice(totalPrice);

      this.view.btnOrder.onclick = this._makeOrder.bind(this);
    } catch(err) {
      console.log(err);
    } finally {
      preloader.hide();
    }
  }

  private async _makeOrder() {
    preloader.show();
    await cartService.clear();

    try {
      await fetch('/api/makeOrder', {
        method: 'POST',
        body: JSON.stringify(this.products)
      })

    } catch(error) {
      console.log(error);

    } finally {
      window.location.href = '/?isSuccessOrder';
    }
  }
}

export const checkoutComp = new Checkout(html);
