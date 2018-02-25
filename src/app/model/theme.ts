import { Thing } from './thing';
import { Resume } from './resume';
import { HasResumes } from './has-resumes.interface';

export class Theme extends Thing implements HasResumes {
    code: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
