import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Thing } from '../model/thing';

@Injectable()
export abstract class RepositoryService {
    readonly apiBaseUri = 'http://api.apply.dev';
    private _items: BehaviorSubject<Thing[]>;
    private store: Thing[];

    /**
     * Constrcutor
     * @param  {Http}   http
     * @return {[type]}
     */
    constructor(private http: Http) {
        this._items = <BehaviorSubject<Thing[]>>new BehaviorSubject([]);
        this.store = [];
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
    protected abstract getResourceName(): string

    /**
     * Gets all resources
     * if id is provided and base resource name is set, the resources are fetched as subresrources
     */
    loadAll(id: number = null) : void {
        if (id && this.getBaseResourceName()) {
            this.http
                .get(`${this.apiBaseUri}/${this.getBaseResourceName()}/${id}/${this.getResourceName()}`)
                .map(this.mapResources, this)
                .subscribe(items => {
                    this.store = items;
                    this._items.next(items);
                });
        } else {
            this.http
                .get(`${this.apiBaseUri}/${this.getResourceName()}`)
                .map(this.mapResources, this)
                .subscribe(items => {
                    this.store = items;
                    this._items.next(items);
                });
        }
    }

    /**
     * Getes all resources based on parameters
     * @param {any[]} parameters
     */
    load(parameters: any[]): void {
        this.http
            .get(`${this.apiBaseUri}/${this.getResourceName()}`, parameters)
            .map(this.mapResources, this)
            .subscribe(items => {
                this.store = items;
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
    save(thing: Thing): void {
        let request;

        // If the thing has an id, its considered that it already exists server side. We are then talking about an update
        if (thing.id) {
            request = this.http.put(`${this.apiBaseUri}/${this.getResourceName()}/${thing.id}`, JSON.stringify(thing), { headers: this.getHeaders() });
        } else { // Else, we are talking about a creation
            request = this.http.post(`${this.apiBaseUri}/${this.getResourceName()}`, JSON.stringify(thing), { headers: this.getHeaders() });
        }

        request.subscribe((response) => {
            thing = this.mapResource(response);
            let alreadyExisting = false;
            let index: number;

            this.store.filter((element, i) => {
                if (element.id == thing.id) {
                    index = i;
                    alreadyExisting = element.id == thing.id;

                    return;
                }
            });

            if (alreadyExisting) {
                this.store[index] = thing;
            } else {
                this.store.push(thing);
            }

            let items = this.store;
            this._items.next(items);
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
                let items = this.store;
                items.splice(items.indexOf(thing), 1);
                this.store = items;

                this._items.next(items);
            });
    }

    /**
     * Transform multiple resources from response to objects
     * @param  {Response} response
     * @return {Thing[]}
     */
    public mapResources(response: Response): Thing[] {
        return response.json()['hydra:member'].map(this.transformResource, this);
    }

    /**
     * Transform a single resource from response to an objects
     * @param  {Response} response
     * @return {Thing}
     */
    protected mapResource(response: Response): Thing {
        return this.transformResource(response.json());
    }

    /**
     * Transform json to an array of objects
     * @param  {any}     r
     * @return {Thing[]}
     */
    public transformResources(r: any): Thing[] {
        let items = [];

        for (let item of r) {
            items.push(this.transformResource(item));
        }

        return items;
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
     * Gets headers for every requests concerning the apiBaseUri
     * @return {[type]}
     */
    private getHeaders() {
        let headers = new Headers();

        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return headers;
    }
}
