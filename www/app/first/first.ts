/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Page, NavController, ViewController, Slides, IonicView, Slider} from 'ionic/ionic';
import {Login} from '../login/login';
import {Dash} from '../dash/dash';

@Page({
  templateUrl: 'app/first/first.html'
})
export class First {
  private nav: NavController;
  private view: ViewController;
  private mySlider: Slider;

  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }
  public login(): void {
    this.nav.push(Dash);
  }

}
