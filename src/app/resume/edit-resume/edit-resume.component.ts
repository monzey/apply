import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ResumeRepositoryService } from '../../shared/resume-repository.service';
import { ResumeSelectorService } from '../../shared/resume-selector.service';
import { Resume } from '../../model/resume';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit {
  protected resumeEditForm: FormGroup;
  protected resume: Resume;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private resumeRepositoryService: ResumeRepositoryService,
    private resumeSelector: ResumeSelectorService,
    private dialogRef: MatDialogRef<EditResumeComponent>
  ) {
    if (data) {
      this.resume = data.resume;
    }

    this.createEditForm();
  }

  protected createEditForm() {
    let resume: Resume;

    resume = new Resume();

    if (this.resume) {
      resume = this.resume;   
    }

    this.resumeEditForm = this.fb.group({
      name: resume.name,
      description: resume.description,
      url: resume.url,
      about: resume.about
    });
  }

  protected save() {
    let resume: Resume;
    resume = this.resumeEditForm.value;

    if (this.resume) {
      resume.id = this.resume.id;
    }

    this.resumeRepositoryService.save(resume).subscribe(r => {
      this.resumeSelector.selectResume(r);
    });

    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
