import { Thing } from './thing';
import { Resume } from './resume';
import { HasResumes } from './has-resumes.interface';

export class Graduation extends Thing implements HasResumes {
    year: string;
    school: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
