import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';

class FavoritesService {
  favoritesBtn: HTMLElement | null;

  constructor() {
    this.favoritesBtn = document.querySelector('.favorites-btn');
  }

  async init() {
    this._toggleFavoritesBtn();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
    this._showFavoritesBtn();
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
    this._toggleFavoritesBtn();
  }

  async clear() {
    await localforage.removeItem(DB);
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
  }

  async isInFavorites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  async _toggleFavoritesBtn() {
    const products = await this.get();
    products.length > 0 ? this._showFavoritesBtn() : this._hideFavoritesBtn();
  }

  private _showFavoritesBtn() {
    this.favoritesBtn?.classList.add('favorites-btn_active');
  }

  private _hideFavoritesBtn() {
    this.favoritesBtn?.classList.remove('favorites-btn_active');
  }

}

export const favoritesService = new FavoritesService();
