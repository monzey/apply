import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Thing } from '../model/thing';

@Injectable()
export class RepositoryService {
    readonly apiBaseUri = 'http://api.apply.dev';

    constructor(private http: Http) { }

    /**
     * Indicates resource name
     * @return {string}
     */
    protected getResourceName(): string {
        return 'things';
    }

    /**
     * Gets all resources
     * @return {Observable<Thing[]>}
     */
    findAll() : Observable<Thing[]> {
        let things$ = this.http
            .get(`${this.apiBaseUri}/${this.getResourceName()}`)
            .map(this.mapResources, this);

        return things$;
    }

    /**
     * Get one resources based on id
     * @param  {number}            id
     * @return {Observable<Thing>}
     */
    find(id: number): Observable<Thing> {
        let thing$ = this.http
            .get(`${this.apiBaseUri}/${this.getResourceName()}/${id}`)
            .map(this.mapResource, this)

        return thing$;
    }

    /**
     * Saves a resources
     * @param  {Thing}                thing
     * @return {Observable<Response>}
     */
    save(thing: Thing): Observable<Response> {
        // If the thing has an id, its considered that it already exists server side. We are then talking about an update
        if (thing.id) {
            return this.http
                .put(`${this.apiBaseUri}/${this.getResourceName()}/${thing.id}`, JSON.stringify(thing), { headers: this.getHeaders() });
        } else { // Else, we are talking about a creation
            return this.http
                .post(`${this.apiBaseUri}/${this.getResourceName()}`, JSON.stringify(thing), { headers: this.getHeaders() });
        }
    }

    /**
     * Deletes a resources
     * @param  {Thing}                thing
     * @return {Observable<Response>}
     */
    delete(thing: Thing): Observable<Response> {
        return this.http
            .delete(`${this.apiBaseUri}/${this.getResourceName()}/${thing.id}`);
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
     * Transform json data to an object
     * @param  {any}   r
     * @return {Thing}
     */
    protected transformResource(r: any): Thing {
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
