import { Component, OnInit } from '@angular/core';
import { ResumeRepositoryService } from '../shared/resume-repository.service';
import { Resume } from '../model/resume';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ResumeSelectorService } from '../shared/resume-selector.service';
import { MatDialog } from '@angular/material';
import { EditResumeComponent } from '../edit-resume/edit-resume.component';

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
        private router: Router,
        private dialog: MatDialog
    ) { }

    selectResume(resume: Resume) {
        this.resumeSelectorService.selectResume(resume);
        this.router.navigate(['general']);
    }

    deleteResume(resume: Resume) {
        this.resumeRepositoryService.delete(resume);
    }

    editResume(resume: Resume) {
        this.dialog.open(EditResumeComponent, {data: {resume: resume}});
    }

    ngOnInit() {
        this.resumes$ = this.resumeRepositoryService.items;
        this.resumeRepositoryService.loadAll();
    }

}
