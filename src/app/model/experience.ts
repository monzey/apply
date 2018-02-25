import { Thing } from './thing';
import { Resume } from './resume';
import { HasResumes } from './has-resumes.interface';

export class Experience extends Thing implements HasResumes {
    company: string;
    year: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
