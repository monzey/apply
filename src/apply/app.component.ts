import { Component } from '@angular/core';
import { MenuService } from './shared/menu.service';
import { MenuItem } from './model/menu-item';
import { Resume } from './model/resume';
import { ResumeRepositoryService } from './shared/resume-repository.service';
import { MatDialog } from '@angular/material';
import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { Observable } from 'rxjs/Observable';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { ResumeSelectorService } from './shared/resume-selector.service';

@Component({
    selector: 'app-root',
    providers: [MenuService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private menuItems: MenuItem[];
    private selectedResume$: Observable<Resume>;
    private resume: Resume;

    constructor(
        private menuService: MenuService,
        private resumeRepositoryService: ResumeRepositoryService,
        private dialog: MatDialog,
        private resumeSelectorService: ResumeSelectorService
    ) {
        this.menuItems = this.menuService.getLinks();
        this.resume = new Resume();
    }

    createResume() {
        this.dialog.open(EditResumeComponent, {});
    }

    createExperience() {
        this.dialog.open(EditExperienceComponent, {data: {resume: this.resume}});
    }

    ngOnInit() {
        let self = this;
        this.selectedResume$ = this.resumeSelectorService.selected;

        this.selectedResume$.subscribe(resume => {
            self.resume = <Resume>resume;
        });
    }
}