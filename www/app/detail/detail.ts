/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Page, NavController, ViewController, NavParams} from 'ionic/ionic';
import {Share} from '../share/share';
import {Person} from '../person/person';
import {LoginService} from '../service/login';
import {ShareLink} from '../shareLink/shareLink';

@Page({
  templateUrl: 'app/detail/detail.html'
})
export class Detail {
  public share: Share;

  private nav: NavController;
  private view: ViewController;
  private loginService: LoginService;

  constructor(nav: NavController, view: ViewController, loginService: LoginService, params: NavParams) {
    this.nav = nav;
    this.view = view;
    this.loginService = loginService;

    this.share = params.get('share');
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

  public participate(): void {
    if (this.loginService.loggedIn()) {
      console.log(this.share.shareWith);
      console.log(this.loginService.user());
      this.share.shareWith.push(this.loginService.user());
    }
  }

  public participating(): boolean {
    return this.share.shareWith.indexOf(this.loginService.user()) > -1;
  }

  public with(names: string): string {
    if (names === undefined || names === '') {
      return '';
    }

    return 'mit ' + names;
  }

  public shareLink(): void {
    this.nav.push(ShareLink);
  }

}
