import {Page, NavController, ViewController, NavParams} from 'ionic/ionic';
import {Share} from '../share/share';

//import * as qr from 'qr-image';

@Page({
  templateUrl: 'app/shareLink/shareLink.html'
})
export class ShareLink {
  public share: Share;

  public qrsvg: string;

  private nav: NavController;
  private view: ViewController;

  constructor(nav: NavController, view: ViewController, params: NavParams) {
    this.nav = nav;
    this.view = view;

    this.share = params.get('share');

  //  this.qrsvg = qr.imageSync(window.location.origin + this.getShareLink(), { type: 'svg' });
  }

  public getShareLink(): string {
    return '?shareId=' + encodeURI(this.share._id);
  }

}
