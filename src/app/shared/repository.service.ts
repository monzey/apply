import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Thing } from '../model/thing';
import { environment } from '../../environments/environment';

@Injectable()
export class RepositoryService {
  readonly apiBaseUri = environment.apiBaseUri;
  protected _items: BehaviorSubject<Thing[]>;
  protected _store: Thing[];

  /**
   * Constrcutor
   * @param  {Http}   http
   * @return {[type]}
   */
  constructor(protected http: HttpClient) {
    this._items = <BehaviorSubject<Thing[]>>new BehaviorSubject([]);
    this._store = [];
  }

  get items() {
    return this._items.asObservable();
  }

  /**
   * Indicates the base resource name
   * @return {string}
   */
  protected getBaseResourceName(): string|null {
    return null;
  }

  /**
   * Indicates resource name
   * @return {string}
   */
  protected getResourceName(): string {
    return '';
  }

  /**
   * Gets all resources
   * if id is provided and base resource name is set, the resources are fetched as subresrources
   * @param {number} id
   * @return {void}
   */
  loadAll(id: number = null) : void {
    if (id && this.getBaseResourceName()) {
      this.http
        .get(`${this.apiBaseUri}/${this.getBaseResourceName()}/${id}/${this.getResourceName()}`)
        .map(this.mapResources, this)
        .subscribe(items => {
          this._store = items;
          this._items.next(items);
        });
    } else {
      this.http
        .get(`${this.apiBaseUri}/${this.getResourceName()}`)
        .map(this.mapResources, this)
        .subscribe(items => {
          this._store = items;
          this._items.next(items);
        });
    }
  }

  /**
   * Gets all resources based on parameters
   * @param {any[]} parameters
   */
  load(parameters: any[]): void {
    this.http
    .get(`${this.apiBaseUri}/${this.getResourceName()}`, parameters)
    .map(this.mapResources, this)
    .subscribe(items => {
      this._store = items;
      this._items.next(items);
    });
  }

  /**
   * Get one resources based on id
   * @param  {number}            id
   */
  loadOne(id: number): void {
    let thing$ = this.http
    .get(`${this.apiBaseUri}/${this.getResourceName()}/${id}`)
    .map(this.mapResource, this);
  }

  /**
   * Saves a resources
   * @param  {Thing}                thing
   * @return {Observable<Response>}
   */
  save(thing: Thing): Observable<any> {
    let request$;

    let data = this.denormalize(thing);

    // If the thing has an id, its considered that it already exists server side. We are then talking about an update
    if (thing.id) {
      request$ = this.http.put(`${this.apiBaseUri}/${this.getResourceName()}/${thing.id}`, data, { headers: this.getHeaders() });
    } else { // Else, we are talking about a creation
      request$ = this.http.post(`${this.apiBaseUri}/${this.getResourceName()}`, data, { headers: this.getHeaders() });
    }

    return request$.flatMap((response) => {
      thing = this.mapResource(response);
      let alreadyExisting = false;
      let index: number;

      this._store.filter((element, i) => {
        if (element.id == thing.id) {
          index = i;
          alreadyExisting = element.id == thing.id;

          return;
        }
      });

      if (alreadyExisting) {
        this._store[index] = thing;
      } else {
        this._store.push(thing);
      }

      let items = this._store;
      this._items.next(items);

      return Observable.of(response);
    });
  }

  /**
   * Deletes a resources
   * @param  {Thing}                thing
   * @return {Observable<Response>}
   */
  delete(thing: Thing): void {
    this.http
    .delete(`${this.apiBaseUri}/${this.getResourceName()}/${thing.id}`)
    .subscribe((response) => {
      let items = this._store;
      items.splice(items.indexOf(thing), 1);
      this._store = items;

      this._items.next(items);
    });
  }

  /**
   * Transform multiple resources from response to objects
   * @param  {Response} response
   * @return {Thing[]}
   */
  public mapResources(response: HttpResponse<any>): Thing[] {
    return response['hydra:member'].map(this.transform, this);
  }

  /**
   * Transform a single resource from response to an objects
   * @param  {Response} response
   * @return {Thing}
   */
  protected mapResource(response: HttpResponse<any>): any {
    return this.transform(response);
  }

  /**
   * Transform json to an array of objects
   * @param  {any}     r
   * @return {Thing[]}
   */
  public transformResources(r: any): Thing[] {
    let items = [];

    if (r != null) {
      for (let item of r) {
        let converted = this.transformResource(item);
        converted['@type'] = item['@type']; // keep the type

        items.push(converted);
      }
    }

    return items;
  }

  /**
   * Generic transformation of json data to an object
   * Used to add generic attributes (like @type)
   * @param {any} r
   * @return {Thing}
   */
  public transform(r: any): Thing {
    let thing = this.transformResource(r);

    thing['@type'] = r['@type'];

    return thing;
  }

  /**
   * Transform json data to an object
   * @param  {any}   r
   * @return {Thing}
   */
  public transformResource(r: any): Thing {
    let thing = <Thing>({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.url
    });

    return thing;
  }

  /**
   * Denormalizes the object to obtain an object understandable by api platform
   * @param {Thing} thing
   * @return string
   */
  public denormalize(thing: Thing): string {
    for (let attribute in thing) {
      if (thing[attribute] instanceof Object && !(thing[attribute] instanceof Array)) {
        thing[attribute] = `/${attribute}/${thing[attribute].id}`
      }

      if (thing[attribute] instanceof Object && thing[attribute] instanceof Array) {
        let items = thing[attribute].slice(0); // Clone
        thing[attribute] = [];

        for (let item of items) {
          let id = item.id;
          thing[attribute].push(`/${attribute}/${id}`);
        }
      }
    }   

    return JSON.stringify(thing);
  }

  /**
   * Gets headers for every requests concerning the apiBaseUri
   * @return {[type]}
   */
  protected getHeaders() {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return headers;
  }
}
