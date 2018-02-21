import { Thing } from './thing';
import { Experience } from './experience';
import { Entity } from '../shared/entity.decorator';

@Entity
export class Resume extends Thing {
    experiences: Experience[];

    constructor() {
        super();
    }
}
