import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Resume } from '../model/resume';
import { HasResumes } from '../model/has-resumes.interface';
import { RepositoryService } from './repository.service';
import { RepositoryContainerService } from './repository-container.service';
import { ExperienceRepositoryService } from './experience-repository.service';

@Injectable()
export class ResumeRepositoryService extends RepositoryService {

  constructor (
    http :HttpClient,
    private experienceRepositoryService: ExperienceRepositoryService,
    private rContainer: RepositoryContainerService
  ) {
    super(http);
  }

  protected getResourceName(): string {
    return 'resumes';
  }

  public transformResource(r: any): Resume {
    let thing = <Resume>({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.url,
      experiences: this.experienceRepositoryService.transformResources(r.experiences)
    });

    return thing;
  }

  /**
   * Efface une propriété de resume s'il est fourni. L'efface complètement s'il ne l'est pas.
   *
   * @returns {undefined}
   */
  public deleteFromResume(thing: HasResumes, resume: Resume = null) {
    if (resume instanceof Resume) {
      this.unbind(thing, resume);
    } else {
      let repository = this.rContainer.get(thing['@type']);
      repository.delete(thing);
    }
  }

  /**
   * Détache la propriété thing de resume
   *
   * @returns {undefined}
   */
  private unbind(thing: HasResumes, resume: Resume): void {
    thing.resumes = thing.resumes.filter(thingResume => {
      return thingResume.id != resume.id;
    });

    let repository = this.rContainer.get(thing['@type']);
    repository.save(thing).subscribe();

    let self = this;
  }
}
