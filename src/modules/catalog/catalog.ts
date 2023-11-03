import { Component } from '../component';
import html from './catalog.tpl.html';
import { ProductList } from '../productList/productList';
import { ProductData } from 'types';
import { SearchTags } from '../searchTags/searchTags';

class Catalog extends Component {
  productList: ProductList;
  searchTags?: SearchTags;
  filteredProducts?: ProductData[];

  constructor(props: any) {
    super(props);
    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);
    this.filteredProducts = this.productList.products;

    this.searchTags = new SearchTags(this.filteredProducts, this.update);
    this.searchTags.attach(this.view.search);
    this.searchTags.render();
  }

  update = (filteredProducts: ProductData[]) => {
    this.productList.update(filteredProducts);
  }
}

export const catalogComp = new Catalog(html);
