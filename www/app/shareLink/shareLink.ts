/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Page, NavController, ViewController} from 'ionic/ionic';

@Page({
  templateUrl: 'app/shareLink/shareLink.html'
})
export class ShareLink {
  private nav: NavController;
  private view: ViewController;

  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

}
