import {CategoryConfig} from '../category/categoryconfig';

export class Category {
  public _id: string;
  public title: string;
  public imgSrc: string;
  public type: string = 'category';
  public config: CategoryConfig;
  public icons: string[];

  constructor(id: string, title: string, imgSrc: string, icons:string[], config?: CategoryConfig) {
    this._id = id;
    this.title = title;
    this.imgSrc = imgSrc;
    this.icons = icons;
    this.config = config;
  }
}
