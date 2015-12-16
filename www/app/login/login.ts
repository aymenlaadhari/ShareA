/// <reference path="../../../typings/tsd.d.ts"/>

import {Page, NavController} from 'ionic/ionic';
import {Person} from '../person/person';
import {DataService} from '../service/data';
import {Dash} from '../dash/dash';
import {Http} from 'angular2/http';
import {Detail} from '../detail/detail';
import {LoginService} from '../service/login';

@Page({
  templateUrl: 'app/login/login.html'
})
export class Login {
  private dataService: DataService;
  private navController: NavController;
  private persons: Person[];
  private loginService: LoginService;
  private paramKey: String;
  private paramValue: String;

  constructor(navController: NavController, dataService: DataService, loginService: LoginService, http: Http) {
    this.navController = navController;
    this.dataService = dataService;
    this.loginService = loginService;

    this.persons = this.dataService.allPersons();

    if (window.location.href.split('?').length > 1) {
      let param: String[];
      param = window.location.href.split('?').pop().split('=');
      console.log(param);
      this.paramValue = param.pop();
      console.log(this.paramValue);
      this.paramKey = param.pop();
      console.log(this.paramKey);

      if (this.paramKey === 'shareId') {
        this.navController.push(Detail, {shareId: this.paramValue});
      }
    }

    /* http.get('http://jsonplaceholder.typicode.com/posts/1').subscribe((value: any): void => {
      console.log(value);
    }); */

  }

  public login(person: Person): void {
    this.loginService.login(person);
    this.navController.push(Dash);
  }
}
