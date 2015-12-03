/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Page, NavController, ViewController} from 'ionic/ionic';
import {Map} from '../map/map';
import {List} from '../list/list';
import {NewCateg} from '../newCateg/newCateg';



@Page({
  templateUrl: 'app/storeTest/storeTest.html'
})
export class StoreTest {
  private nav: NavController;
  private view: ViewController;
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;

    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = List;
    this.tab2Root = Map;
    this.tab3Root = NewCateg;
  }
}
