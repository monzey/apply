import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Graduation } from '../model/graduation';
import { RepositoryService } from './repository.service';

@Injectable()
export class GraduationRepositoryService extends RepositoryService {
    protected getBaseResourceName(): string {
        return 'resumes';
    }

    protected getResourceName(): string {
        return 'graduations';
    }

    public transformResource(r: any): Graduation {
        let thing = <Graduation>({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.url,
            school: r.school,
            year: r.year,
            resumes: r.resumes
        });

        return thing;
    }
}
