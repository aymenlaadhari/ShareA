/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Page, NavController, ViewController, NavParams} from 'ionic/ionic';
import {FormBuilder, Validators, ControlGroup} from 'angular2/angular2';
import {Share} from '../model/share';
import {Person} from '../model/person';
import {Category} from '../model/category';
import {DataService} from '../service/data';
import {Detail} from '../detail/detail';

@Page({
  templateUrl: 'app/new/new.html'
})
export class New {
  public category:Category;
  private nav: NavController;
  private navParam : NavParams;
  private view: ViewController;
  public shares: Share[];
  private persons: Person[];
  public categorie: Category;
  public sharesShowing: string;
  private dataService: DataService;


  constructor(nav: NavController, view: ViewController, dataService: DataService, formBuilder: FormBuilder, navParam : NavParams) {
    this.nav = nav;
    this.view = view;
    this.nav = nav;
    this.view = view;
    this.dataService = dataService;
    this.shares = dataService.allShares();
    this.persons = this.dataService.allPersons();
    this.category = navParam.get('category');
    this.sharesShowing = 'all';
  }

  public filteredShares(): Share[] {
    return this.shares
      .filter((share: Share) => share.category._id === this.category._id);
  }

  public showDetail(share: Share): void {
    this.nav.push(Detail, {share: share});
  }
}
