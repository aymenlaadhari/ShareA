export class Person {
  public _id: string;
  public name: string;
  public type: string = 'person';

  constructor(id: string, name: string) {
    this._id = id;
    this.name = name;
  }
}
