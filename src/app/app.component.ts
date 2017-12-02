import { Component } from '@angular/core';
import { MenuService } from './shared/menu.service';
import { MenuItem } from './model/menu-item';
import { Resume } from './model/resume';
import { ResumeRepositoryService } from './shared/resume-repository.service';
import { MatDialog } from '@angular/material';
import { EditResumeComponent } from './edit-resume/edit-resume.component';

@Component({
    selector: 'app-root',
    providers: [MenuService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private menuItems: MenuItem[];

    constructor(private menuService: MenuService, private resumeRepositoryService: ResumeRepositoryService, private dialog: MatDialog) {
        this.menuItems = this.menuService.getLinks();
    }

    createResume() {
        this.dialog.open(EditResumeComponent, {});
    }

    ngOnInit() {
    }
}
