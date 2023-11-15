import localforage from 'localforage';
import { genUUID } from '../utils/helpers';

const ID_DB = '__wb-userId';

class UserService {
  id: string | null = null;

  async init() {
    this.id = await this.getId();
    console.warn('UserID: ', this.id);
  }

  async getId(): Promise<string> {
    if (!this.id) {

      let id = await localforage.getItem(ID_DB) as string;

      if (!id) id = await this._setId();
      this.id = id;

      return id;
    } else {
      return this.id;
    }
  }

  private async _setId(): Promise<string> {
    const id = genUUID();
    await localforage.setItem(ID_DB, id);
    return id;
  }

}

export const userService = new UserService();
