import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTagList.tpl.html';
import { SearchTag } from '../searchTag/searchTag';
import { SearchTagData } from 'types';

export class SearchTagList {
  view: View;
  tagList: SearchTagData[];

  constructor(tagList: SearchTagData[]) {
    this.view = new ViewTemplate(html).cloneView();
    this.tagList = tagList;
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  async render() {

    this.view.root.innerHTML = '';

    const exampleNode = document.createTextNode('Например, ');
    this.view.root.appendChild(exampleNode);

    this.tagList.forEach((tag, index) => {
      const tagComp = new SearchTag(tag);
      tagComp.render();
      tagComp.attach(this.view.root);

      if (index < this.tagList.length - 1) {
        if (index === this.tagList.length - 2) {
          //add 'или' before last tag
          const orNode = document.createTextNode(' или ');
          this.view.root.appendChild(orNode);
        } else {
          //add comma after all tags except last one
          const commaNode = document.createTextNode(', ');
          this.view.root.appendChild(commaNode);
        }
      }
    });
  }

}
