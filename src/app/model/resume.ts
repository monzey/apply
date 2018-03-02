import { Thing } from './thing';
import { Experience } from './experience';
import { Project } from './project';
import { Graduation } from './graduation';

export class Resume extends Thing {
  experiences: Experience[];
  graduations: Graduation[];
  projects: Project[];
  about: string;

  constructor() {
    super();
  }
}
