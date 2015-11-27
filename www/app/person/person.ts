export class Person {
  public _id: string;
  public name: string;
  public type: string = 'person';

  constructor(name: string) {
    this.name = name;
  }
}
