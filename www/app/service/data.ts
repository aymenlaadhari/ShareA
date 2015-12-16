/// <reference path="../../../typings/tsd.d.ts"/>

import {Share} from '../share/share';
import {Category} from '../category/category';
import {Person} from '../person/person';

/* tslint:disable */
// todo check es6 import of pouchdb
declare function require(name: string): any;
let PouchDB = require('pouchdb');
/* tslint:enable */

export class DataService {
  private localDB: pouchdb.promise.PouchDB;
  private categories: Category[];
  private shares: Share[];
  private persons: Person[];

  constructor() {
    this.localDB = new PouchDB('sharedota-db');
    this.categories = this.allCategories();
    this.shares = this.allShares();
    this.persons = this.allPersons();

    window.PouchDB = PouchDB;
  }

  public allCategories(): Category[] {
    let categories: Category[] = [];
    this.allDocsOfType('category', (doc: pouchdb.api.methods.allDocs.StoredDoc) => {
      categories.push(<Category><any>doc);
    });

    return categories;
  }

  public allShares(): Share[] {
    let shares: Share[] = [];

    this.allDocsOfType('share', (doc: pouchdb.api.methods.allDocs.StoredDoc) => {
      shares.push(<Share><any>doc);
    });

    return shares;
  }

  public allPersons(): Person[] {
    let persons: Person[] = [];

    this.allDocsOfType('person', (doc: pouchdb.api.methods.allDocs.StoredDoc) => {
      persons.push(<Person><any>doc);
    });
    return persons;
  }

  /**
   * Iterates through the persons array and returns the person with the matching id.
   */
  public getPersonWithId(id: string): Person {
    let returnArray: Person[] = this.persons.filter((person: Person) => person._id === id);
    return returnArray[0];
  }

  /**
   * Iterates through the Share array and returns the Share with the matching id.
   */
  public getShareWithId(id: string): Share {
    let returnArray: Share[] = this.shares.filter((share: Share) => share._id === id);
    return returnArray[0];
  }

  /**
   * returns Category with given id
   */
  public getCategoryWithId(id: string): Category {
    let returnArray: Category[] = this.categories.filter((category: Category) => category._id === id);
    return returnArray[0];
  }

  /**
   * Inserts a new share to the database. If the _id of the share is already used in the database,
   * the method adds a "1" to the _id and try to save it again.
   */
  public insertShare(share: Share): void {

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

    this.localDB.put(shareObject).then()
    .catch(function ( err: any): void {
        if (err === 409) { // conflict
          shareObject._id = shareObject._id + '1';
          this.localDB.put(shareObject);
        } else {
          console.log('Error!');
          console.log(err);
        }
      });
  }

  private allDocsOfType(type: string, callback: (storedDoc: pouchdb.api.methods.allDocs.StoredDoc) => any): void {
    this.localDB
    .allDocs({
      include_docs: true,
      attachments: true,
    })
    .then((response: pouchdb.api.methods.allDocs.Response) => {
      response.rows.forEach((
        container: pouchdb.api.methods.allDocs.DocContainer<pouchdb.api.methods.allDocs.StoredDoc>,
        index: number,
          array: pouchdb.api.methods.allDocs.DocContainer<pouchdb.api.methods.allDocs.StoredDoc>[]) => {
            if ((<any>container.doc).type === type) {
              callback(container.doc);
            }
          });
    });
  }
}
