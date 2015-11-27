import {Page, NavController, ViewController} from 'ionic/ionic';
import {ActionSheet} from 'ionic/ionic';
import {Modal} from 'ionic/ionic';

@Page({
  template: `
  <ion-content padding>

    <button (click)="close()">Zuruk</button>
    <div padding>
  <ion-segment [(ng-model)]="pet">
    <ion-segment-button value="kittens">
      Zeit
    </ion-segment-button>
    <ion-segment-button value="puppies">
      Ort
    </ion-segment-button>
  </ion-segment>
</div>

<div [ng-switch]="pet">
    <ion-list>

<h2>Heute</h2>
  <ion-item>
    <ion-avatar item-left>
      <img src="img/appicon.png">
    </ion-avatar>
    <h2>Heute</h2>
    <p>Ugh. As if.</p>
  </ion-item>
  <ion-item>
    <ion-avatar item-left>
      <img src="img/appicon.png">
    </ion-avatar>
    <h2>Cher</h2>
    <p>Ugh. As if.</p>
  </ion-item>
  <ion-item>
    <ion-avatar item-left>
      <img src="img/appicon.png">
    </ion-avatar>
    <h2>Cher</h2>
    <p>Ugh. As if.</p>
  </ion-item>
</ion-list>
<ion-list *ng-switch-when="'puppies'">
<h2>Nachste Woche</h2>

  <ion-item>
    <ion-avatar item-left>
      <img src="img/appicon.png">
    </ion-avatar>
    <h2>Cher</h2>
    <p>Ugh. As if.</p>
  </ion-item>
  <ion-item>
    <ion-avatar item-left>
      <img src="img/appicon.png">
    </ion-avatar>
    <h2>Cher</h2>
    <p>Ugh. As if.</p>
  </ion-item>
  <ion-item>
    <ion-avatar item-left>
      <img src="img/appicon.png">
    </ion-avatar>
    <h2>Cher</h2>
    <p>Ugh. As if.</p>
  </ion-item>

</ion-list>
</div>
  </ion-content>`
})
class MyModal {
  constructor() {
  }
}


@Page({
  templateUrl: 'app/store/store.html'
})
export class Store {
  private nav: NavController;
  private view: ViewController;
  private actionSheet: ActionSheet;
  private modal : Modal;

  constructor(nav: NavController, view: ViewController, actionSheet: ActionSheet, modal : Modal) {
    this.nav = nav;
    this.view = view;
    this.actionSheet = actionSheet;
    this.modal = modal;
  }

  showAction()
  {
    this.actionSheet.open({
      buttons : [
        {
        text : 'Share'
      },
    {
      text  : 'Holen'

    }],
   cancelText: 'Cancel',
   cancel: function() {
        console.log('CANCELLED');
      },

      buttonClicked: function(index) {

        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }



    });
  }

  showSusbs()
  {
    this.modal.open(MyModal);
  }

}
