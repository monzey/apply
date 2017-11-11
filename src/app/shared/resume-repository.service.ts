import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Resume } from '../model/resume';
import { RepositoryService } from './repository.service';

@Injectable()
export class ResumeRepositoryService extends RepositoryService {
    protected getResourceName(): string {
        return 'resumes';
    }

    protected transformResource(r: any): Resume {
        let thing = <Resume>({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.url
        });

        return thing;
    }
}
