import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Project } from '../model/project';
import { RepositoryService } from './repository.service';

@Injectable()
export class ProjectRepositoryService extends RepositoryService {
  protected getBaseResourceName(): string {
    return 'resumes';
  }

  protected getResourceName(): string {
    return 'side_projects';
  }

  public transformResource(r: any): Project {
    let thing = <Project>({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.url,
      resumes: r.resumes
    });

    return thing;
  }
}
