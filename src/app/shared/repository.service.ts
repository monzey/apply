import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Thing } from '../model/thing';

@Injectable()
export class RepositoryService {
    readonly apiBaseUri = 'http://api.apply.dev';
    private _items: BehaviorSubject<Thing[]>;
    private store: Thing[];

    constructor(private http: Http) {
        this._items = <BehaviorSubject<Thing[]>>new BehaviorSubject([]);
        this.store = [];
    }

    get items() {
        return this._items.asObservable();
    }

    /**
     * Indicates resource name
     * @return {string}
     */
    protected getResourceName(): string {
        return 'things';
    }

    /**
     * Gets all resources
     */
    loadAll() : void {
        this.http
            .get(`${this.apiBaseUri}/${this.getResourceName()}`)
            .map(this.mapResources, this)
            .subscribe(items => {
                this.store = items;
                this._items.next(items);
            })
    }

    /**
     * Get one resources based on id
     * @param  {number}            id
     */
    load(id: number): void {
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
            let index = this.store.indexOf(thing);

            if (index > -1) {
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
    protected mapResources(response: Response): Thing[] {
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
