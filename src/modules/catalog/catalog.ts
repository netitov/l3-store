import { Component } from '../component';
import html from './catalog.tpl.html';
import { ProductList } from '../productList/productList';
import { SearchTags } from '../searchTags/searchTags';
import { tags } from '../../utils/tags';

class Catalog extends Component {
  productList: ProductList;
  searchTags: SearchTags;

  constructor(props: any) {
    super(props);
    this.productList = new ProductList();
    this.productList.attach(this.view.products);
    this.searchTags = new SearchTags(tags);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);

    this.searchTags.attach(this.view.search);
    this.searchTags.render();
  }

}

export const catalogComp = new Catalog(html);
