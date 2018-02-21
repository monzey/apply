import { Thing } from './thing';
import { Experience } from './experience';

export class Resume extends Thing {
    experiences: Experience[];

    constructor() {
        super();
    }
}
