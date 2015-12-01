/// <reference path="../../../typings/pouchDB/pouchdb.d.ts"/>

import {Share} from '../share/share';
import {Category} from '../category/category';
import {Person} from '../person/person';

let PouchDB = require('pouchdb');

export class DataInit {
    private shares: Share[];
    private categories: Category[];
    private persons: Person[];

    private personDB: pouchdb.promise.PouchDB;

    public init(): void {
      this.personDB = new PouchDB('personDB');

      // this.fillWithData();

      window.PouchDB = PouchDB;
      console.log('replicating');

      let remoteDB: string = 'https://' +
                             '035e0137-413b-4d3a-8273-9b6945dc3206-bluemix' +
                             ':' +
                             'f21458e3f0f6d1c33e30ccc93ec40c5658bf042effe24f818f38d8847f964efa' +
                             '@' +
                             '035e0137-413b-4d3a-8273-9b6945dc3206-bluemix.cloudant.com/sample_nosql_db';

      PouchDB.replicate(remoteDB, 'personDB', {
        live: true,
        retry: true
      }).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    }

    private fillWithData(): void {
      let JOURNEY: Category = new Category('journey', 'Fahrten von Hbf Münster', '../img/taxi.jpg');
      let MEAL: Category = new Category('meal', 'Essen in Münster', 'http://www.theholyrood.co.uk/files/2012/10/Content_FoodDrink.jpg');

      this.categories = [];
      this.categories.push(JOURNEY);
      this.categories.push(MEAL);
      let ALEX: Person = new Person('Alex');
      let PETER: Person = new Person('Peter');
      let AYMEN: Person = new Person('Aymen');
      let DAVID: Person = new Person('David');
      let SIMON: Person = new Person('Simon');
      let ADRIAN: Person = new Person('Adrian');
      let MATTHIAS: Person = new Person('Matthias');
      let RUDI: Person = new Person('Rudi');
      let JENS: Person = new Person('Jens');
      let MAX: Person = new Person('Max');

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
                                 '', 'ion-md-car', 'Hbf Münster', 'Standort Münster', '09:00 Uhr', '', ALEX, [PETER, AYMEN], JOURNEY));
      this.shares.push(new Share('Hbf Münster zum Hbf Karlsruhe',
                                 '', 'ion-md-train', 'Hbf Münster', 'Hbf Karlsruhe', '17:21 Uhr', '', MATTHIAS, [AYMEN], JOURNEY));
      this.shares.push(new Share('Biergarten Holder',
                                 '', 'ion-ios-pint', 'Biergarten Holder', '', '17:21 Uhr', '', JENS, [AYMEN, DAVID, RUDI, MATTHIAS], MEAL));
      this.shares.push(new Share('Weinverköstigung',
                                 '', 'ion-ios-wine', 'Weinkeller', '', '18:21 Uhr', '', RUDI, [AYMEN, DAVID, RUDI, MATTHIAS], MEAL));
      this.shares.push(new Share('Piiizza!', '', 'ion-ios-pizza',
                                 'Pizza Hut', '', '19:00 Uhr', '21:00 Uhr', SIMON, [AYMEN, DAVID, RUDI, MATTHIAS], MEAL));

      this.storeInitCategories(this.categories);
      this.storeInitPersons(this.persons);
      this.storeInitShares(this.shares);
    }

    private storeInitCategories(categories: Category[] ): void {

        for (let i: number = 0; i < categories.length; i++ ) {
            let category: Category = categories[i];

            let categoryObject: Category = {
                _id: category._id,
                type: category.type,
                title: category.title,
                imgSrc: category.imgSrc
            };

            this.upsert(this.personDB, categoryObject);
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
              owner: share.owner,
              shareWith: share.shareWith,
              category: share.category
            };

            this.upsert(this.personDB, shareObject);
        }
    }

    private storeInitPersons(persons: Person[]): void {

      for (let i: number = 0; i < persons.length; i++) {
        let person: Person = persons [i];

        let personObject: any = {
          _id: person.name,
          type: person.type,
          name: person.name
        };

        this.upsert(this.personDB, personObject);
      }
    }

    private upsert(pouchDB: pouchdb.promise.PouchDB, object: any): void {
      pouchDB
        .get(object._id)
        .then((doc: pouchdb.api.methods.ExistingDoc) => undefined)
        .catch((reason: any) => { pouchDB.put(object); });
    }
}
