import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Experience } from '../model/experience';
import { RepositoryService } from './repository.service';

@Injectable()
export class ExperienceRepositoryService extends RepositoryService {
    protected getBaseResourceName(): string {
        return 'resumes';
    }

    protected getResourceName(): string {
        return 'experiences';
    }

    public transformResource(r: any): Experience {
        let thing = <Experience>({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.url,
            company: r.company,
            year: r.year,
            resumes: r.resumes
        });

        return thing;
    }
}
