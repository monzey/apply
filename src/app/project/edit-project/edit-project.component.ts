import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Project } from '../../model/project';
import { Resume } from '../../model/resume';
import { ProjectRepositoryService } from '../../shared/project-repository.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  protected projectEditForm: FormGroup;
  protected project: Project;
  protected resume: Resume;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private projectRepositoryService: ProjectRepositoryService,
    private dialogRef: MatDialogRef<EditProjectComponent>
  ) {
    if (data) {
      this.resume = data.resume;
      this.project = data.project;
    }

    this.createEditForm();
  }

  protected createEditForm() {
    let project: Project;

    project = new Project;

    if (this.project) {
      project = this.project;
    }

    this.projectEditForm = this.fb.group({
      name: project.name,
      description: project.description,
      url: project.url,
    })
  }

  protected save() {
    let project: Project;
    project = this.projectEditForm.value;

    if (this.project) {
      project.id = this.project.id;
    }

    if (this.resume) {
      project.resumes = [this.resume];
    }

    this.projectRepositoryService.save(project).subscribe();
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
