import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTags.tpl.html';

export class SearchTags {
  view: View;
  tagArray: Array<{ tag: string, href: string }>;
  tagElements: Element[];

  constructor(tagArray: Array<{ tag: string, href: string }>) {
    this.view = new ViewTemplate(html).cloneView();
    this.tagArray = tagArray;
    this.tagElements = Array.from(this.view.root.querySelectorAll('.searchTags__link'));
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  async render() {

    this.tagElements.forEach((i, index) => {
      const childElement = i.firstElementChild;
      if (childElement) {
        childElement.textContent = this.tagArray[index].tag;
        i.setAttribute('href', this.tagArray[index].href);
      }
    })
  }

}
