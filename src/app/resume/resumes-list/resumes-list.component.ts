import { Component, OnInit } from '@angular/core';
import { ResumeRepositoryService } from '../../shared/resume-repository.service';
import { Resume } from '../../model/resume';
import { Router } from '@angular/router';
import { Parameters } from '../../model/parameters';
import { Observable } from 'rxjs/Observable';
import { ResumeSelectorService } from '../../shared/resume-selector.service';
import { MatDialog } from '@angular/material';
import { EditResumeComponent } from '../edit-resume/edit-resume.component';
import { ParametersRepositoryService } from '../../shared/parameters-repository.service';

@Component({
  selector: 'app-resumes-list',
  providers: [],
  templateUrl: './resumes-list.component.html',
  styleUrls: ['./resumes-list.component.css']
})
export class ResumesListComponent implements OnInit {
  private resumes$: Observable<Resume[]>;
  private parameters$: Observable<Parameters>;

  constructor(
    private resumeRepositoryService: ResumeRepositoryService,
    private resumeSelectorService: ResumeSelectorService,
    private parametersRepositoryService: ParametersRepositoryService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  create(): void {
    this.dialog.open(EditResumeComponent, {});
  }

  selectResume(resume: Resume) {
    this.resumeSelectorService.selectResume(resume);
    this.router.navigate(['general']);
  }

  delete(resume: Resume) {
    this.resumeRepositoryService.delete(resume);
  }

  edit(resume: Resume) {
    this.dialog.open(EditResumeComponent, {data: {resume: resume}});
  }

  configure(resume: Resume, thing: string) {
    this.resumeSelectorService.selectResume(resume);
    this.router.navigate([thing]);
  }

  ngOnInit() {
    this.resumes$ = this.resumeRepositoryService.items;

    this.parameters$ = this.parametersRepositoryService.item;

    this.parametersRepositoryService.load();
    this.resumeRepositoryService.loadAll();
  }
}
