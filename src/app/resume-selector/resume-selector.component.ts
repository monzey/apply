import { Component, OnInit } from '@angular/core';
import { ResumeRepositoryService } from '../repository/resume-repository.service';
import { Resume } from '../model/resume';
import { ResumeSelectorService } from './resume-selector.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-resume-selector',
    providers: [ResumeRepositoryService, ResumeSelectorService],
    templateUrl: './resume-selector.component.html',
    styleUrls: ['./resume-selector.component.scss']
})
export class ResumeSelectorComponent implements OnInit {
    private resumes: Resume[];
    private selectedResume: Resume;

    constructor(
        private resumeRepositoryService: ResumeRepositoryService,
        private router: Router,
        private resumeSelectorService: ResumeSelectorService
    ) { }

    selectResume(resume: Resume) {
        this.resumeSelectorService.selectResume(resume);
        this.router.navigate(['general']);
    }

    ngOnInit() {
        this.resumeRepositoryService
            .findAll()
            .subscribe(resumes => this.resumes = resumes);
    }

}
