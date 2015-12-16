import {Person} from '../person/person';

export class LoginService {
  private person: Person;

  public login(person: Person): void {
    this.person = person;
  }

  public user(): Person {
    return this.person;
  }

  public loggedIn(): boolean {
    return this.person !== undefined;
  }

  public personalisedName(person: Person, personalisedName: string): string {
    return person._id === this.user()._id ? personalisedName : person.name;
  }
}
