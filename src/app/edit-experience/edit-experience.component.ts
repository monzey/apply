import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Experience } from '../model/experience';
import { ExperienceRepositoryService } from '../shared/experience-repository.service';

@Component({
    selector: 'app-edit-experience',
    templateUrl: './edit-experience.component.html',
    styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {
    protected experienceEditForm: FormGroup;
    protected experience: Experience;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private experienceRepositoryService: ExperienceRepositoryService,
        private dialogRef: MatDialogRef<EditExperienceComponent>
    ) {
        this.experience = data.experience;
        this.createEditForm();
    }

    protected createEditForm() {
        var experience = this.experience;

        this.experienceEditForm = this.fb.group({
            name: experience.name,
            description: experience.description,
            year: experience.year,
            url: experience.url,
            company: experience.company
        })
    }

    protected save() {
        let experience: Experience;
        experience = this.experienceEditForm.value;
        experience.id = this.experience.id;

        this.experienceRepositoryService.save(experience);
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}
