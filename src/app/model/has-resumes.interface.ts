import { Resume } from './resume';
import { Thing } from './thing';

export interface HasResumes extends Thing {
  resumes: Resume[];
}
