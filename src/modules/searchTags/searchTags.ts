import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTags.tpl.html';
import { ProductList } from '../productList/productList';
import { ProductData } from 'types';

export class SearchTags {
  view: View;
  popularProducts: ProductList;
  allProducts: ProductData[];
  tagArray: string[];
  tagElements: Element[];
  updateProducts

  constructor(allProducts: ProductData[], updateProducts: Function) {
    this.view = new ViewTemplate(html).cloneView();
    this.popularProducts = new ProductList();
    this.allProducts = allProducts;
    this.tagArray = [];
    this.tagElements = Array.from(this.view.root.children);
    this.updateProducts = updateProducts;
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  private async _getPopularTags() {
    const productsResp = await fetch('/api/getPopularProducts');
    const products = await productsResp.json();
    this.popularProducts.update(products);

    for (let i = 0; this.tagArray.length < 3; i++) {
      const randomIndex = Math.floor(Math.random() * this.popularProducts.products.length);
      const randomProduct = this.popularProducts.products[randomIndex];
      const productName = randomProduct.name.split(' ')[1];

      if (!this.tagArray.includes(productName)) this.tagArray.push(productName);
    }
  }

  private _filter(link: any) {
    this._clearFilters();

    link.classList.add('searchTags__link-text_active');
    const selectedTag = link.textContent;
    const filteredproducts = this.allProducts.filter(i => i.name.includes(selectedTag));

    this.updateProducts(filteredproducts);
  }

  private _clearFilters() {
    this.tagElements.forEach((i) => {
      const childElement = i.firstElementChild
      if (childElement) {
        childElement.classList.remove('searchTags__link-text_active');
      }
    })
  }

  async render() {
    await this._getPopularTags();

    this.tagElements.forEach((i, index) => {
      const link = i as HTMLElement;
      const childElement = i.firstElementChild
      if (childElement) {
        childElement.textContent = this.tagArray[index];
      }
      link.onclick = (e) => {
        e.preventDefault();
        this._filter(childElement)
      };
    })
  }

}
