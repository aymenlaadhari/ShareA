import {App, Platform, StatusBar} from 'ionic/ionic';
import {Login} from './login/login';
import {DataService} from './service/data';
import {HTTP_PROVIDERS} from 'angular2/http';
import {LoginService} from './service/login';
import {DataInit} from './service/dataInit';

@App({
  template: '<ion-nav [root]="root"></ion-nav><ion-overlay></ion-overlay>',
  providers: [DataService, LoginService, HTTP_PROVIDERS],
  config: {
    mode: 'md'
  }
})
export class ShareA {
  private platform: Platform;
  private root: any;

  constructor(platform: Platform) {
    this.platform = platform;
    this.root = Login;

    this.initializeData();
    this.initializeApp();
  }

  private initializeData(): void {
    let dataInit: DataInit = new DataInit();
    dataInit.init();
    // dataInit.fillWithData();
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      console.log('Platform ready');
    });
  }
}
