/// <reference path="../../../typings/pouchDB/pouchdb.d.ts"/>

import {Share} from '../model/share';
import {Category} from '../model/category';
import {Person} from '../model/person';

let PouchDB = require('pouchdb');

export class DataService {
  private personDB: pouchdb.promise.PouchDB;
  private shareDB: pouchdb.promise.PouchDB;
  private categoryDB: pouchdb.promise.PouchDB;

  constructor() {
    this.personDB = new PouchDB('personDB');
    this.shareDB = new PouchDB('shareDB');
    this.categoryDB = new PouchDB('categoryDB');

    window.PouchDB = PouchDB;
  }

  public allCategories(): Category[] {
    let categories: Category[] = [];

    this.allDocsOfType('category', (doc: pouchdb.api.methods.allDocs.StoredDoc) => {
      categories.push(doc);
    })

    return categories;
  }

  public allShares(): Share[] {
    let shares: Share[] = [];

    this.allDocsOfType('share', (doc: pouchdb.api.methods.allDocs.StoredDoc) => {
      shares.push(doc);
    })

    return shares;
  }

  public allPersons(): Person[] {
    let persons: Person[] = [];

    this.allDocsOfType('person', (doc: pouchdb.api.methods.allDocs.StoredDoc) => {
      persons.push(doc);
    })

    return persons;
  }

  private allDocsOfType(type: string, callback: (pouchdb.api.methods.allDocs.StoredDoc)=> any): void {
    this.personDB
    .allDocs({
      include_docs: true,
      attachments: true
    })
    .then((response: pouchdb.api.methods.allDocs.Response) => {
      response.rows.forEach((
        container: pouchdb.api.methods.allDocs.DocContainer<pouchdb.api.methods.allDocs.StoredDoc>,
        index: number,
          array: pouchdb.api.methods.allDocs.DocContainer<pouchdb.api.methods.allDocs.StoredDoc>[]) => {
            if (container.doc.type === type) {
              callback(container.doc);
            }
          });
    });
  }
}
