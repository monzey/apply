import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../../shared/resume-selector.service';
import { GraduationRepositoryService } from '../../shared/graduation-repository.service';
import { ResumeRepositoryService } from '../../shared/resume-repository.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Resume } from '../../model/resume';
import { Graduation } from '../../model/graduation';
import { EditGraduationComponent } from '../edit-graduation/edit-graduation.component';
import { DuplicateResumeThingComponent } from '../../resume/duplicate-resume-thing/duplicate-resume-thing.component';

@Component({
  selector: 'app-graduations-list',
  templateUrl: './graduations-list.component.html',
  styleUrls: ['./graduations-list.component.scss']
})
export class GraduationsListComponent implements OnInit {
  private graduations$: Observable<Graduation[]>;
  private selectedResume$: Observable<Resume>;

  public constructor(
    private resumeSelectorService: ResumeSelectorService,
    private graduationRepositoryService: GraduationRepositoryService,
    private resumeRepositoryService: ResumeRepositoryService,
    private dialog: MatDialog
  ) { }

  public create(): void {
    let resume: Resume;

    this.selectedResume$.subscribe(r => {
      resume = r;
    });

    console.log(resume);
    this.dialog.open(EditGraduationComponent, {data: {resume: resume}});
  }

  public edit(graduation: Graduation): void {
    this.dialog.open(EditGraduationComponent, {
      data: { graduation: graduation }
    });
  }

  public delete(graduation: Graduation): void {
    let resume: Resume;

    this.selectedResume$.subscribe(r => {
      let resume = r;
    });

    this.resumeRepositoryService.deleteFromResume(graduation, resume);
  }

  public duplicate(graduation: Graduation): void {
    this.dialog.open(DuplicateResumeThingComponent, {
      data: { thing: graduation }
    });
  }

  private unbind(graduation: Graduation, resume: Resume): void {
    graduation.resumes = graduation.resumes.filter(gradResume => {
      return gradResume.id != resume.id;
    });

    this.graduationRepositoryService.save(graduation);
    let self = this;
  }

  public ngOnInit(): void {
    let self = this;
    this.selectedResume$ = this.resumeSelectorService.selected;

    this.selectedResume$.subscribe(resume => {
      self.graduations$ = self.graduationRepositoryService.items;

      let id: any;

      if (resume == null) {
        id = null;
      } else {
        id = resume.id
      }

      self.graduationRepositoryService.loadAll(id);
    });
  }


}
