import { Component, OnInit } from '@angular/core';
import { ResumeRepositoryService } from '../shared/resume-repository.service';
import { Resume } from '../model/resume';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ResumeSelectorService } from '../shared/resume-selector.service';

@Component({
    selector: 'app-resumes-list',
    providers: [],
    templateUrl: './resumes-list.component.html',
    styleUrls: ['./resumes-list.component.css']
})
export class ResumesListComponent implements OnInit {
    private resumes$: Observable<Resume[]>;

    constructor(
        private resumeRepositoryService: ResumeRepositoryService,
        private resumeSelectorService: ResumeSelectorService,
        private router: Router
    ) { }

    selectResume(resume: Resume) {
        this.resumeSelectorService.selectResume(resume);
        this.router.navigate(['general']);
    }

    deleteResume(resume: Resume) {
        this.resumeRepositoryService.delete(resume);
    }

    ngOnInit() {
        this.resumes$ = this.resumeRepositoryService.items;
        this.resumeRepositoryService.loadAll();
    }

}
