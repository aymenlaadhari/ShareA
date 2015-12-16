import {Page, NavController, ViewController} from 'ionic/ionic';
import {ActionSheet} from 'ionic/ionic';
import {Modal} from 'ionic/ionic';
import {Category} from '../model/category';
import {Person} from '../model/person';
import {DataService} from '../service/data';

@Page({
  templateUrl: 'app/list/list.html'
})
export class List {
  private nav: NavController;
  private view: ViewController;
  public categories: Category[];
  private dataService: DataService;

  constructor(nav: NavController, view: ViewController, dataService: DataService) {
    this.nav = nav;
    this.view = view;
    this.dataService = dataService;
    this.categories = dataService.allCategories();
  }

close()
{
  this.nav.pop();
}

public filteredShares(categoryId: string): Category[] {
  return this.categories
    .filter((category: Category) =>category._id === categoryId);
}
}
