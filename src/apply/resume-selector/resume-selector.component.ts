import { Component, OnInit } from '@angular/core';
import { ResumeRepositoryService } from '../shared/resume-repository.service';
import { Resume } from '../model/resume';
import { ResumeSelectorService } from '../shared/resume-selector.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-resume-selector',
    providers: [],
    templateUrl: './resume-selector.component.html',
    styleUrls: ['./resume-selector.component.scss']
})
export class ResumeSelectorComponent implements OnInit {
    private resumes$: Observable<Resume[]>;
    private selectedResume$: Observable<Resume>;

    constructor(
        private resumeRepositoryService: ResumeRepositoryService,
        private router: Router,
        private resumeSelectorService: ResumeSelectorService
    ) { }

    selectResume(resume: Resume) {
        this.resumeSelectorService.selectResume(resume);
    }

    ngOnInit() {
        this.selectedResume$ = this.resumeSelectorService.selected;
        this.resumes$ = this.resumeRepositoryService.items;
        this.resumeRepositoryService.loadAll();
    }

}
