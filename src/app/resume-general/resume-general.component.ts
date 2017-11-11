import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../resume-selector/resume-selector.service';
import { Resume } from '../model/resume';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-resume-general',
    providers: [],
    templateUrl: './resume-general.component.html',
    styleUrls: ['./resume-general.component.scss']
})
export class ResumeGeneralComponent implements OnInit {
    selectedResume$: Observable<Resume>;

    constructor(private resumeSelectorService: ResumeSelectorService) { }

    ngOnInit() {
        this.selectedResume$ = this.resumeSelectorService.selected;
    }
}
