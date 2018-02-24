import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Graduation } from '../../model/graduation';
import { Resume } from '../../model/resume';
import { GraduationRepositoryService } from '../../shared/graduation-repository.service';

@Component({
  selector: 'app-edit-graduation',
  templateUrl: './edit-graduation.component.html',
  styleUrls: ['./edit-graduation.component.scss']
})
export class EditGraduationComponent implements OnInit {
  protected graduationEditForm: FormGroup;
  protected graduation: Graduation;
  protected resume: Resume;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private graduationRepositoryService: GraduationRepositoryService,
    private dialogRef: MatDialogRef<EditGraduationComponent>
  ) {
    if (data) {
      this.resume = data.resume;
      this.graduation = data.graduation;
    }

    this.createEditForm();
  }

  protected createEditForm() {
    let graduation: Graduation;

    graduation = new Graduation;

    if (this.graduation) {
      graduation = this.graduation;
    }

    this.graduationEditForm = this.fb.group({
      name: graduation.name,
      description: graduation.description,
      year: graduation.year,
      url: graduation.url,
      school: graduation.school,
    })
  }

  protected save() {
    let graduation: Graduation;
    graduation = this.graduationEditForm.value;

    if (this.graduation) {
      graduation.id = this.graduation.id;
    }

    if (this.resume) {
      graduation.resumes = [this.resume];
    }

    this.graduationRepositoryService.save(graduation);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
