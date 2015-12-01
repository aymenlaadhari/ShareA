import {Page, NavController, ViewController} from 'ionic/ionic';
import {ActionSheet} from 'ionic/ionic';
import {Modal} from 'ionic/ionic';

@Page({
  templateUrl: 'app/list/list.html'
})
export class List {
  private nav: NavController;
  private view: ViewController;

  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

close()
{
  this.nav.pop();
}
}
