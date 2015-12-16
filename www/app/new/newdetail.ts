/// <reference path="../../../typings/tsd.d.ts"/>

import {Page, NavController, NavParams, Modal} from 'ionic/ionic';
import {Category} from '../category/category';
import {CategoryConfig} from '../category/categoryconfig';
import {Share} from '../share/share';
import {DataService} from '../service/data';
import {LoginService} from '../service/login';
import {Dash} from '../dash/dash';
import {IconModal} from './iconmodal';

@Page({
  templateUrl: 'app/new/newdetail.html'
})
export class NewDetail {
  private nav: NavController;
  private choosedCategory: Category;
  private choosedCategoryConfig: CategoryConfig;
  private dataService: DataService;
  private loginService: LoginService;
  private newShare: Share;
  private modal: Modal;

  constructor(params: NavParams, nav: NavController, dataService: DataService, loginService: LoginService, modal: Modal) {
    this.nav = nav;
    this.choosedCategory = params.get('choosedCategory');
    this.choosedCategoryConfig = this.choosedCategory.config;
    this.dataService = dataService;
    this.loginService = loginService;
    this.modal = modal;
    this.newShare = new Share('', '', 'ion-md-share', '', '', '', '', this.loginService.user()._id, [], this.choosedCategory);
  }

  chooseIcon(): void {
    this.modal.open(IconModal, {choosedCategory: this.choosedCategory, newShare: this.newShare});
  }

  saveNewShare(): void {
    this.dataService.insertShare(this.newShare);
    this.nav.push(Dash);
  }
}
