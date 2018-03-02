import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Parameters } from '../model/parameters';
import { RepositoryService } from './repository.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ParametersRepositoryService extends RepositoryService {
  protected _item: BehaviorSubject<Parameters>;

  constructor(protected http: HttpClient) {
    super(http);

    this._item = <BehaviorSubject<Parameters>>new BehaviorSubject(null);
  }

  get item() {
    return this._item.asObservable();
  }

  protected getBaseResourceName(): string {
    return 'resumes';
  }

  protected getResourceName(): string {
    return 'parameters';
  }

  public transformResource(r: any): Parameters {
    let thing = <Parameters>({
      id: r.id,
      fullName: r.fullName,
      emailAddress: r.emailAddress,
    });

    return thing;
  }

  /**
   * {@inheritDoc}
   */
  load(parameters: any[] = null): void {
    this.http
    .get(`${this.apiBaseUri}/${this.getResourceName()}`)
    .map(this.mapResource, this)
    .subscribe(item => {
      this._store = item;
      this._item.next(item);
    });
  }
}
