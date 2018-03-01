import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../../shared/resume-selector.service';
import { ExperienceRepositoryService } from '../../shared/experience-repository.service';
import { ResumeRepositoryService } from '../../shared/resume-repository.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Resume } from '../../model/resume';
import { Experience } from '../../model/experience';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';
import { DuplicateResumeThingComponent } from '../../resume/duplicate-resume-thing/duplicate-resume-thing.component';

@Component({
  selector: 'app-experiences-list',
  templateUrl: './experiences-list.component.html',
  styleUrls: ['./experiences-list.component.scss']
})
export class ExperiencesListComponent implements OnInit {
  private experiences$: Observable<Experience[]>;
  private selectedResume$: Observable<Resume>;

  public constructor(
    private resumeSelectorService: ResumeSelectorService,
    private experienceRepositoryService: ExperienceRepositoryService,
    private resumeRepositoryService: ResumeRepositoryService,
    private dialog: MatDialog
  ) { }

  public create(): void {
    let resume: Resume;

    this.selectedResume$.subscribe(r => {
      resume = r;
    });

    this.dialog.open(EditExperienceComponent, {
      data: { resume: resume }
    });
  }

  public edit(experience: Experience): void {
    this.dialog.open(EditExperienceComponent, {
      data: { experience: experience }
    });
  }

  public delete(experience: Experience): void {
    let resume: Resume;

    this.selectedResume$.subscribe(r => {
      let resume = r;
    });

    this.resumeRepositoryService.deleteFromResume(experience, resume);
  }

  public duplicate(experience: Experience): void {
    this.dialog.open(DuplicateResumeThingComponent, {
      data: { thing: experience }
    });
  }

  private unbind(experience: Experience, resume: Resume): void {
    experience.resumes = experience.resumes.filter(expResume => {
      return expResume.id != resume.id;
    });

    this.experienceRepositoryService.save(experience).subscribe();
    let self = this;
  }

  public ngOnInit(): void {
    let self = this;
    this.selectedResume$ = this.resumeSelectorService.selected;

    this.selectedResume$.subscribe(resume => {
      self.experiences$ = self.experienceRepositoryService.items;

      let id: any;

      if (resume == null) {
        id = null;
      } else {
        id = resume.id
      }

      self.experienceRepositoryService.loadAll(id);
    });
  }

}
