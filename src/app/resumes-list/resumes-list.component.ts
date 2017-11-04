import { Component, OnInit } from '@angular/core';
import { ResumeRepositoryService } from '../repository/resume-repository.service';
import { Resume } from '../model/resume';

@Component({
    selector: 'app-resumes-list',
    providers: [ResumeRepositoryService],
    templateUrl: './resumes-list.component.html',
    styleUrls: ['./resumes-list.component.css']
})
export class ResumesListComponent implements OnInit {
    private resumes: Resume[];

    constructor(private resumeRepositoryService: ResumeRepositoryService) { }

    ngOnInit() {
        this.resumeRepositoryService
            .findAll()
            .subscribe(resumes => this.resumes = resumes);
    }

}
