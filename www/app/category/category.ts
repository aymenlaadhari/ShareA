export class Category {
  public _id: string;
  public title: string;
  public imgSrc: string;
  public type: string = 'category';

  constructor(id: string, title: string, imgSrc: string) {
    this._id = id;
    this.title = title;
    this.imgSrc = imgSrc;
    
  }
}
