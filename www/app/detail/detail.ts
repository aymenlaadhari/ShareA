/// <reference path="../../../typings/tsd.d.ts"/>

import {Page, NavController, ViewController, NavParams} from 'ionic/ionic';
import {Share} from '../share/share';
import {Person} from '../person/person';
import {Category} from '../category/category';
import {LoginService} from '../service/login';
import {ShareLink} from '../shareLink/shareLink';
import {DataService} from '../service/data';

@Page({
  templateUrl: 'app/detail/detail.html'
})
export class Detail {
  public share: Share;

  private nav: NavController;
  private view: ViewController;
  private loginService: LoginService;
  private dataService: DataService;

  private randomStars: any[];

  constructor(nav: NavController, view: ViewController, loginService: LoginService, params: NavParams, dataService: DataService) {
    this.nav = nav;
    this.view = view;
    this.loginService = loginService;
    this.dataService = dataService;
    this.randomStars = new Array(Math.floor(Math.random() * 4 + 1));

    this.share = params.get('share');
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

  public participate(): void {
    if (this.loginService.loggedIn()) {
      this.share.shareWith.push(this.loginService.user()._id);
    }
  }

  public departicipate(): void {
    if (this.loginService.loggedIn()) {
      this.share.shareWith.splice(this.share.shareWith.indexOf(this.loginService.user()._id), 1);
    }
  }

  public getAllPersonsById(personIds: string[]): Person[] {
    let returnPersons: Array<Person> = new Array();
    for (let i: number = 0; i < personIds.length; i++) {
      returnPersons.push(this.dataService.getPersonWithId(personIds[i]));
    }
    return returnPersons;
  }

  public participating(): boolean {
    return this.share.shareWith.indexOf(this.loginService.user()._id) > -1 || this.share.ownerId === this.loginService.user()._id;
  }

  public with(names: string): string {
    if (names === undefined || names === '') {
      return '';
    }

    return 'mit ' + names;
  }

  public shareLink(share: Share): void {
    this.nav.push(ShareLink, {share: share});
  }

}
