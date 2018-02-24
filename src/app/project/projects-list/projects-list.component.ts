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

  public edit(project: Project): void {
    this.dialog.open(EditProjectComponent, {
      data: { project: project }
    });
  }

  public delete(project: Project): void {
    if (project.resumes.length > 1) {
      let resume: Resume;

      this.selectedResume$.subscribe(r => {
        resume = r;
      });

      this.unbind(project, resume);
    } else {
      this.projectRepositoryService.delete(project);
    }
  }

  public duplicate(project: Project): void {
    this.dialog.open(DuplicateResumeThingComponent, {
      data: { thing: project }
    });
  }

  private unbind(project: Project, resume: Resume): void {
    project.resumes = project.resumes.filter(gradResume => {
      return gradResume.id != resume.id;
    });

    this.projectRepositoryService.save(project);
    let self = this;
  }

  public ngOnInit(): void {
    let self = this;
    this.selectedResume$ = this.resumeSelectorService.selected;

    this.selectedResume$.subscribe(resume => {
      self.projects$ = self.projectRepositoryService.items;
      self.projectRepositoryService.loadAll(resume.id);
    });
  }


}
