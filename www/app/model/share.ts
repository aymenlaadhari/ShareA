import {Category} from '../model/category';
import {Person} from '../model/person';

export class Share {
  public _id: string;
  public title: string;
  public content: string;
  public icon: string;

  public placeFrom: string;
  public placeTo: string;

  public timeFrom: string;
  public timeUntil: string;

  public ownerId: string;
  public shareWith: string[];

  public category: Category;

  public type: string = 'share';

  // taxi: anfangsort, endeort, anfangszeit, endezeit, owner, personen[]
  // essen: anfangsort, , anfangszeit, endezeit, owner, personen[]
  // büro: anfangsort, owner, personen[]

  constructor(
    title: string,
    content: string,
    icon: string,
    placeFrom: string,
    placeTo: string,
    timeFrom: string,
    timeUntil: string,
    ownerId: string,
    shareWith: string[],
    category: Category
  ) {
    this.title = title;
    this.content = content;
    this.icon = icon;
    this.placeFrom = placeFrom;
    this.placeTo = placeTo;
    this.timeFrom = timeFrom;
    this.timeUntil = timeUntil;
    this.ownerId = ownerId;
    this.shareWith = shareWith;
    this.category = category;
  }
}
