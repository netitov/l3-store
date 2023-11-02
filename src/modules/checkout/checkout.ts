import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import { analyticsService } from '../../services/analytics.service';
import { genUUID } from '../../utils/helpers';

class Checkout extends Component {
  products!: ProductData[];
  cartPrice: Number

  constructor(props: any) {
    super(props);
    this.cartPrice = 0;
  }

  async render() {
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
    this.cartPrice = totalPrice;
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();
    try {
      await fetch('/api/makeOrder', {
        method: 'POST',
        body: JSON.stringify(this.products)
      })

      const productIds = this.products.map((i) => i.id);
      analyticsService.sendAlaytics('purchase', { orderId: genUUID(), totalPrice: this.cartPrice, productIds });

    } catch(error) {
      console.log(error);
    }
    finally {
      window.location.href = '/?isSuccessOrder';
    }
  }

}

export const checkoutComp = new Checkout(html);
