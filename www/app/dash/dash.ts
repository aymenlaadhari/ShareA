import {Page, NavController, ViewController} from 'ionic/ionic';
import {FormBuilder} from 'angular2/angular2';

import {New} from '../new/new';
import {Share} from '../share/share';
import {FilterPipe} from '../pipes/filter_pipe';
import {Category} from '../category/category';
import {DataService} from '../service/data';
import {Person} from '../person/person';
import {Detail} from '../detail/detail';
import {LoginService} from '../service/login';

@Page({
  pipes: [FilterPipe],
  templateUrl: 'app/dash/dash.html',
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

  public checkShareContainsPerson(shareWith: string[], user: Person): boolean {
    for (var i: number = 0; i < shareWith.length; i++) {
        if (shareWith[i] === user._id) {
          return true;
        }
    }
    return false;
  }

  public filteredShares(categoryId: string, sharesShowing: string): Share[] {
    return this.shares
      .filter((share: Share) => share.category._id === categoryId)
      .filter((share: Share) => sharesShowing === 'all'
        || share.ownerId === this.loginService.user()._id //
        || this.checkShareContainsPerson(share.shareWith, this.loginService.user()//
      ));
  }

  public namesFrom(personIds: string[]): String {
    const numberOfPersons: number = personIds.length;
    if (numberOfPersons < 1) {
      return '';
    }

    if (numberOfPersons === 1) {
      return this.loginService.personalisedName(this.dataService.getPersonWithId(personIds[0]), 'Dir');
    }

    let persons: Person[] = this.getAllPersonsById(personIds);
    return persons
      .slice(0, -1)
      .map((person: Person) => this.loginService.personalisedName(person, 'Dir'))
      .reduce((previous: string, current: string) => `${previous}, ${current}`)
      .concat(' und ')
      .concat(this.loginService.personalisedName(persons[numberOfPersons - 1], 'Dir'));
  }

  public getPersonById(personId: string): Person {
    return this.dataService.getPersonWithId(personId);
  }

  public getAllPersonsById(personIds: string[]): Person[] {
    let returnPersons: Array<Person> = new Array();
    for (var i: number = 0; i < personIds.length; i++) {
      returnPersons.push(this.dataService.getPersonWithId(personIds[i]));
    }
    return returnPersons;
  }

  public addShare(): void {
    this.nav.push(New);
  }

  public showDetail(share: Share): void {
    this.nav.push(Detail, {share: share});
  }

}
