import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../shared/resume-selector.service';
import { ExperienceRepositoryService } from '../shared/experience-repository.service';
import { Observable } from 'rxjs/Observable';
import { Resume } from '../model/resume';

@Component({
    selector: 'app-experiences-list',
    templateUrl: './experiences-list.component.html',
    styleUrls: ['./experiences-list.component.scss']
})
export class ExperiencesListComponent implements OnInit {
    private selectedResume$: Observable<Resume>;

    constructor(
        private resumeSelectorService: ResumeSelectorService,
        private experienceRepositoryService: ExperienceRepositoryService
    ) { }

    ngOnInit() {
        this.selectedResume$ = this.resumeSelectorService.selected;

        this.selectedResume$.subscribe(function (data) {
            console.log(data);
        })
    }

}
