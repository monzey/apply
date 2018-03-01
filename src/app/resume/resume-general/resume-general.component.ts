import { Component, OnInit } from '@angular/core';
import { ResumeSelectorService } from '../../shared/resume-selector.service';
import { Resume } from '../../model/resume';
import { Observable } from 'rxjs/Observable';
import { EditResumeComponent } from '../edit-resume/edit-resume.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resume-general',
  providers: [],
  templateUrl: './resume-general.component.html',
  styleUrls: ['./resume-general.component.scss']
})
export class ResumeGeneralComponent implements OnInit {
  selectedResume$: Observable<Resume>;

  constructor(
    private resumeSelectorService: ResumeSelectorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.selectedResume$ = this.resumeSelectorService.selected;
  }

  create(): void {
    this.dialog.open(EditResumeComponent, {});
  }
}
