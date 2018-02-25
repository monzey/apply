import { Thing } from './thing';
import { Resume } from './resume';
import { HasResumes } from './has-resumes.interface';

export class Project extends Thing implements HasResumes {
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
