import { Thing } from './thing';
import { Resume } from './resume';

export class Theme extends Thing {
    name: string;
    code: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
