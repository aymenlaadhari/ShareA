/// <reference path="../../../typings/tsd.d.ts"/>

import {Page, NavController, ViewController} from 'ionic/ionic';
import {DataService} from '../service/data';
import {Category} from '../category/category';
import {NewDetail} from './newdetail';

@Page({
  templateUrl: 'app/new/new.html'
})
export class New {
  public choosedCategory: Category;
  private nav: NavController;
  private view: ViewController;
  private dataService: DataService;
  private categories: Category[];

  constructor(nav: NavController, view: ViewController, dataService: DataService) {
    this.nav = nav;
    this.view = view;
    this.dataService = dataService;
    this.categories = this.dataService.allCategories();
  }

  chooseCategory(choosedCategory: Category): void {
    this.choosedCategory = choosedCategory;
    this.nav.push(NewDetail, {
      choosedCategory: choosedCategory
    });
  }
}
