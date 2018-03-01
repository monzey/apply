import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../../shared/resume-selector.service';
import { ProjectRepositoryService } from '../../shared/project-repository.service';
import { ResumeRepositoryService } from '../../shared/resume-repository.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Resume } from '../../model/resume';
import { Project } from '../../model/project';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { DuplicateResumeThingComponent } from '../../resume/duplicate-resume-thing/duplicate-resume-thing.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  private projects$: Observable<Project[]>;
  private selectedResume$: Observable<Resume>;

  public constructor(
    private resumeSelectorService: ResumeSelectorService,
    private projectRepositoryService: ProjectRepositoryService,
    private resumeRepositoryService: ResumeRepositoryService,
    private dialog: MatDialog
  ) { }

  public create(): void {
    let resume: Resume;

    this.selectedResume$.subscribe(r => {
      resume = r;
    });

    this.dialog.open(EditProjectComponent, {data: {resume: resume}});
  }

  public edit(project: Project): void {
    this.dialog.open(EditProjectComponent, {
      data: { project: project }
    });
  }

  public delete(project: Project): void {
    let resume: Resume;

    this.selectedResume$.subscribe(r => {
      let resume = r;
    });

    this.resumeRepositoryService.deleteFromResume(project, resume);
  }

  public duplicate(project: Project): void {
    this.dialog.open(DuplicateResumeThingComponent, {
      data: { thing: project }
    });
  }

  public ngOnInit(): void {
    let self = this;
    this.selectedResume$ = this.resumeSelectorService.selected;

    this.selectedResume$.subscribe(resume => {
      self.projects$ = self.projectRepositoryService.items;

      let id: any;

      if (resume == null) {
        id = null;
      } else {
        id = resume.id
      }

      self.projectRepositoryService.loadAll(id);
    });
  }


}
