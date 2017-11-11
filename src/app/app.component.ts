import { Component } from '@angular/core';
import { MenuService } from './shared/menu.service';
import { MenuItem } from './model/menu-item';
import { Resume } from './model/resume';
import { ResumeRepositoryService } from './shared/resume-repository.service';

@Component({
    selector: 'app-root',
    providers: [MenuService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private menuItems: MenuItem[];

    constructor(private menuService: MenuService, private resumeRepositoryService: ResumeRepositoryService) {
        this.menuItems = this.menuService.getLinks();
    }

    createResume() {
        let resume = <Resume>({name: 'noob', description: 'noobism', url:'http://google.com'});
        this.resumeRepositoryService.save(resume);
    }

    ngOnInit() {
    }
}
