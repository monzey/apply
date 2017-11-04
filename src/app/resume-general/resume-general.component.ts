import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../resume-selector/resume-selector.service';

@Component({
    selector: 'app-resume-general',
    providers: [ResumeSelectorService],
    templateUrl: './resume-general.component.html',
    styleUrls: ['./resume-general.component.scss']
})
export class ResumeGeneralComponent implements OnInit {

    constructor(private resumeSelectorService: ResumeSelectorService) { }

    ngOnInit() {
        this.resumeSelectorService.getSelectedResume();
    }

}
