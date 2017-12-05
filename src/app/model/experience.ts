import { Thing } from './thing';
import { Resume } from './resume';

export class Experience extends Thing {
    company: string;
    year: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
