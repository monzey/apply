import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Experience } from '../../model/experience';
import { Resume } from '../../model/resume';
import { Thing } from '../../model/thing';
import { Observable } from 'rxjs/Observable';
import { ResumeRepositoryService } from '../../shared/resume-repository.service';
import { RepositoryContainerService } from '../../shared/repository-container.service';

@Component({
  selector: 'app-duplicate-resume-thing',
  templateUrl: './duplicate-resume-thing.component.html',
  styleUrls: ['./duplicate-resume-thing.component.scss']
})
export class DuplicateResumeThingComponent implements OnInit {
  protected resumeDuplicationForm: FormGroup;
  protected thing: Thing;
  protected resumeControl = new FormControl();
  protected resume: Resume;
  protected resumes$: Observable<Resume[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DuplicateResumeThingComponent>,
    private resumeRepositoryService: ResumeRepositoryService,
    private rContainer: RepositoryContainerService
  ) {
    if (data) {
      this.thing = data.thing;
    }
  }

  protected duplicate(): void {
    this.resume = this.resumeControl.value;
    let repository = this.rContainer.get(this.thing['@type']);

    this.thing['resumes'].push(this.resume);

    repository.save(this.thing).subscribe();

    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.resumes$ = this.resumeRepositoryService.items;
    this.resumeRepositoryService.loadAll();
  }

}
