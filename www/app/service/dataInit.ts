import {Share} from '../share/share';
import {Category} from '../category/category';
import {CategoryConfig} from '../category/categoryconfig';
import {Person} from '../person/person';

/* tslint:disable */
// todo check es6 import of pouchdb
declare function require(name: string): any;
let PouchDB = require('pouchdb');
/* tslint:enable */

export class DataInit {
    private shares: Share[];
    private categories: Category[];
    private persons: Person[];

    private localDB: pouchdb.promise.PouchDB;

    public init(): void {
      this.localDB = new PouchDB('sharedota-db');
      let remoteDB: pouchdb.promise.PouchDB;

      let remoteDBString: string = 'https://' +
     '8758865a-45a2-487f-9b3c-a1217bf908d5-bluemix' +
     ':' +
     '9526a028fe8206bbb42cdc6022f785957e2fcabe31330d1586e3eb951c473d04' +
     '@' +
     '8758865a-45a2-487f-9b3c-a1217bf908d5-bluemix.cloudant.com/sharea';

      remoteDB = new PouchDB(remoteDBString, {cache: true});

      window.PouchDB = PouchDB;
      console.log('replicating');

      // todo fix typings
      (<any>PouchDB).replicate(remoteDB,this.localDB, {
        live: true,
        retry: true,
      }).then((result: any) => {
        console.log(result);
      }).catch((err: any) => {
        console.log(err);
      });

    }

    public fillWithData(): void {
      let JOURNEYCONFIG: CategoryConfig = new CategoryConfig(true, false, true, true, true, true, true);
      let JOURNEY: Category = new Category('journey', 'Fahrten von Münster', '../img/taxi.jpg', ['ion-md-car', 'ion-md-train'], JOURNEYCONFIG);
      let MEALCONFIG: CategoryConfig = new CategoryConfig(true, true, true, false, true, false, false);
      let MEAL: Category = new Category('meal', 'Essen in München', 'http://www.theholyrood.co.uk/files/2012/10/Content_FoodDrink.jpg', ['ion-ios-wine', 'ion-ios-pizza'], MEALCONFIG);

      this.categories = [];
      this.categories.push(JOURNEY);
      this.categories.push(MEAL);

      let ALEX: Person = new Person('1', 'Alex');
      let PETER: Person = new Person('2', 'Peter');
      let AYMEN: Person = new Person('3', 'Aymen');
      let DAVID: Person = new Person('4', 'David');
      let SIMON: Person = new Person('5', 'Simon');
      let ADRIAN: Person = new Person('6', 'Adrian');
      let MATTHIAS: Person = new Person('7', 'Matthias');
      let RUDI: Person = new Person('8', 'Rudi');
      let JENS: Person = new Person('9', 'Jens');
      let MAX: Person = new Person('10', 'Max');

      this.persons = [];
      this.persons.push(ALEX);
      this.persons.push(PETER);
      this.persons.push(AYMEN);
      this.persons.push(DAVID);
      this.persons.push(SIMON);
      this.persons.push(ADRIAN);
      this.persons.push(MATTHIAS);
      this.persons.push(RUDI);
      this.persons.push(JENS);
      this.persons.push(MAX);

      this.shares = [];
      this.shares.push(new Share('Hbf Münster zum Standort Münster',
                                 '', 'ion-md-car', 'Hbf Münster', 'Standort Münster', '09:00 Uhr', '', '1', ['2', '3'], JOURNEY));
      this.shares.push(new Share('Hbf Münster zum Hbf Karlsruhe',
                                 '', 'ion-md-train', 'Hbf Münster', 'Hbf Karlsruhe', '17:21 Uhr', '', '7', ['3'], JOURNEY));
      this.shares.push(new Share('Biergarten Holder',
                                 '', 'ion-ios-pint', 'Biergarten Holder', '', '17:21 Uhr', '', '9', ['10', '4', '8', '6'], MEAL));
      this.shares.push(new Share('Weinverköstigung',
                                 '', 'ion-ios-wine', 'Weinkeller', '', '18:21 Uhr', '', '8', ['10', '4', '8', '7'], MEAL));
      this.shares.push(new Share('Piiizza!', '', 'ion-ios-pizza',
                                 'Pizza Hut', '', '19:00 Uhr', '21:00 Uhr', '5', ['3', '4', '6', '7'], MEAL));

      this.storeInitCategories(this.categories);
      this.storeInitPersons(this.persons);
      this.storeInitShares(this.shares);
    }

    private storeInitCategories(categories: Category[] ): void {

        for (let i: number = 0; i < categories.length; i++ ) {
            let category: Category = categories[i];

            let categoryObject: Category = {
                _id: category._id,
                title: category.title,
                imgSrc: category.imgSrc,
                type: category.type,
                icons: category.icons,
                config: category.config,
            };

            this.upsert(this.localDB, categoryObject);
        }

    }

    private storeInitShares(shares:  Share[]): void {

        for (let i: number = 0; i < shares.length; i++) {
            let share: Share = shares[i];

            let shareObject: any = {
              _id: share.title,
              title: share.title,
              type: share.type,
              content: share.content,
              icon: share.icon,
              placeFrom: share.placeFrom,
              placeTo: share.placeTo,
              timeFrom: share.timeFrom,
              timeUntil: share.timeUntil,
              ownerId: share.ownerId,
              shareWith: share.shareWith,
              category: share.category,
            };

            this.upsert(this.localDB, shareObject);
        }
    }

    private storeInitPersons(persons: Person[]): void {

      persons.forEach((person: Person) => {

        let personObject: any = {
          _id: person._id,
          type: person.type,
          name: person.name,
        };

        this.upsert(this.localDB, personObject);
      });
    }

    private upsert(pouchDB: pouchdb.promise.PouchDB, object: any): void {
      pouchDB
        .get(object._id)
        .then((doc: pouchdb.api.methods.ExistingDoc) => {pouchDB.remove(doc); pouchDB.put(object); } )
        .catch((reason: any) => { pouchDB.put(object); });
    }
}
