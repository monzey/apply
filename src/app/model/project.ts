import { Thing } from './thing';
import { Resume } from './resume';

export class Project extends Thing {
    title: string;
    description: string;
    resumes: Resume[];

    constructor() {
        super();
        this.resumes = [];
    }
}
