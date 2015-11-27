/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Page, NavController, ViewController} from 'ionic/ionic';

@Page({
  templateUrl: 'app/new/new.html'
})
export class New {
  private nav: NavController;
  private view: ViewController;

  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

}
