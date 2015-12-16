/// <reference path="../../../typings/tsd.d.ts"/>

import {Page,Modal} from 'ionic/ionic';
import {Category} from '../category/category';
import {Share} from '../share/share';

@Page({
  templateUrl: `app/new/iconmodal.html`
})
export class IconModal {
  private modal: Modal;
  private choosedCategory: Category;
  private newShare: Share;

  constructor(modal: Modal) {
    this.modal = modal;
    this.choosedCategory = this.modal._defaults.choosedCategory;
    this.newShare = this.modal._defaults.newShare;
  }

  chooseIcon(icon: string): void {
    this.newShare.icon = icon;
    this.modal.get().close();
  }
}
