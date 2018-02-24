import { Thing } from './thing';
import { Resume } from './resume';

export class Graduation extends Thing {
    year: string;
    school: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
