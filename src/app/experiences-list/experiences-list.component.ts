import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../shared/resume-selector.service';
import { ExperienceRepositoryService } from '../shared/experience-repository.service';
import { ResumeRepositoryService } from '../shared/resume-repository.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Resume } from '../model/resume';
import { Experience } from '../model/experience';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';

@Component({
    selector: 'app-experiences-list',
    templateUrl: './experiences-list.component.html',
    styleUrls: ['./experiences-list.component.scss']
})
export class ExperiencesListComponent implements OnInit {
    private experiences$: Observable<Experience[]>;
    private experiences: Experience[];
    private selectedResume$: Observable<Resume>;

    constructor(
        private resumeSelectorService: ResumeSelectorService,
        private experienceRepositoryService: ExperienceRepositoryService,
        private resumeRepositoryService: ResumeRepositoryService,
        private dialog: MatDialog
    ) { }

    addExperience(experience: Experience) {
        this.dialog.open(EditExperienceComponent, {
            data: { experience: experience }
        });
    }

    editExperience(experience: Experience) {
        this.dialog.open(EditExperienceComponent, {
            data: { experience: experience }
        });
    }

    ngOnInit() {
        let self = this;
        this.selectedResume$ = this.resumeSelectorService.selected;

        this.selectedResume$.subscribe(resume => {
            self.experiences$ = self.experienceRepositoryService.items;
            self.experienceRepositoryService.loadAll(resume.id);
        });
    }

}
