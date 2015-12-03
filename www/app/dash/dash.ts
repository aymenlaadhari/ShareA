/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Page, NavController, ViewController} from 'ionic/ionic';
import {FormBuilder, Validators, ControlGroup} from 'angular2/angular2';

import {New} from '../new/new';
import {Store} from '../store/store';
import {List} from '../list/list';
import {StoreTest} from '../storeTest/storeTest';
import {Share} from '../model/share';
import {FilterPipe} from '../pipes/filter_pipe';
import {Category} from '../model/category';
import {DataService} from '../service/data';
import {Person} from '../model/person';
import {Detail} from '../detail/detail';
import {LoginService} from '../service/login';

@Page({
  templateUrl: 'app/dash/dash.html',
  pipes: [FilterPipe]
})
export class Dash {
  public shares: Share[];
  public categories: Category[];
  public sharesShowing: string;

  private dataService: DataService;
  private loginService: LoginService;
  private nav: NavController;
  private view: ViewController;

  constructor(nav: NavController, view: ViewController, dataService: DataService, loginService: LoginService, formBuilder: FormBuilder) {
    this.nav = nav;
    this.view = view;
    this.dataService = dataService;
    this.loginService = loginService;

    this.shares = dataService.allShares();
    this.categories = dataService.allCategories();

    this.sharesShowing = 'all';
  }

  public filteredShares(categoryId: string, sharesShowing: string): Share[] {
    return this.shares
      .filter((share: Share) => share.category._id === categoryId)
      .filter((share: Share) => sharesShowing === 'all' || share.shareWith.indexOf(this.loginService.user()) > -1);
  }

  public namesFrom(persons: Person[]): string {
    const numberOfPersons: number = persons.length;

    if (numberOfPersons < 1) {
      return '';
    }

    if (numberOfPersons === 1) {
      return persons[0].name;
    }

    return persons
      .slice(0, -1)
      .map((person: Person) => person.name)
      .reduce((previous: string, current: string) => `${previous}, ${current}`)
      .concat(' und ')
      .concat(persons[numberOfPersons - 1].name);
  }

  public addStore(): void {
    this.nav.push(StoreTest);
  }

  public addShare(category:Category): void {
    this.nav.push(New,{category:category});
  }


  public showDetail(share: Share): void {
    this.nav.push(Detail, {share: share});
  }

  public loadMore(share: Share): void {
    this.nav.push(Detail, {share: share});
  }

}
