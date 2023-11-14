import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTag.tpl.html';
import { SearchTagData } from 'types';


export class SearchTag {
  view: View;
  tag: SearchTagData;

  constructor(tag: SearchTagData) {
    this.tag = tag;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { tag, href } = this.tag;

    this.view.root.setAttribute('href', href);
    this.view.searchText.innerText = tag;
  }
}
