import { Component } from '../component';
import html from './favorites.tpl.html';
import { favoritesService } from '../../services/favorites.service';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';

class Favorites extends Component {
    products!: ProductList;
    favoriteProducts!: ProductData[];
  
    async render() {
      this.favoriteProducts = await favoritesService.get();
  
      if (this.favoriteProducts.length < 1) {
        return;
      }
      
      this.products = new ProductList();
      this.products.update(this.favoriteProducts);
      this.products.attach(this.view.favoriteProducts);
    }
  }

export const favoritesComp = new Favorites(html);
