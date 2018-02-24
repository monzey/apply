import { Thing } from './thing';
import { Resume } from './resume';

export class Project extends Thing {
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
