import {Page, NavController} from 'ionic/ionic';
import {Person} from '../model/person/person';
import {DataService} from '../service/data';
import {Dash} from '../dash/dash';
import {Http} from 'angular2/http';
import {LoginService} from '../service/login';

@Page({
  templateUrl: 'app/login/login.html'
})
export class Login {
  private dataService: DataService;
  private navController: NavController;
  private persons: Person[];
  private loginService: LoginService;

  constructor(navController: NavController, dataService: DataService, loginService: LoginService, http: Http) {
    this.navController = navController;
    this.dataService = dataService;
    this.loginService = loginService;

    this.persons = this.dataService.allPersons();

    http.get('http://jsonplaceholder.typicode.com/posts/1')
    .subscribe({
      next: (value: any): number => this.persons.push(new Person(JSON.parse(value._body).id)),
      error: (throwable: any): void => undefined,
      complete: (): void => undefined
    });
  }

  public login(person: Person): void {
    this.loginService.login(person);
    this.navController.push(Dash);
  }
}
