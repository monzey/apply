import { Injectable } from '@angular/core';
import { Resume } from '../model/resume';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResumeSelectorService {
    private readonly localStorageKey = 'resume';
    private selectedResume: Subject<Resume>;

    constructor() {
        if (this.memorizedResume()) {
            this.selectedResume = new BehaviorSubject<Resume>(this.retrieveFromLocalStorage());
        } else {
            this.selectedResume = new ReplaySubject();
        }
    }

    /**
     * Sets the resume for the app
     * @param {Resume} resume
     */
    selectResume(resume: Resume): void {
        this.selectedResume.next(resume);
        this.saveToLocalStorage(resume);
    }

    get selected(): Observable<Resume> {
        return this.selectedResume.asObservable();
    }

    /**
     * Recovers the Resume object from localStorage
     * @return {Resume}
     */
    private retrieveFromLocalStorage(): Resume {
        return <Resume>(JSON.parse(localStorage.getItem(this.localStorageKey)));
    }

    /**
     * Saves the currently selected resume into the localStorage
     * @return {void}
     */
    private saveToLocalStorage(resume: Resume): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(resume));
    }

    /**
     * Deletes the selected resume from localStorage
     * @return {void}
     */
    private eraseFromLocalStorage(): void {
        localStorage.removeItem(this.localStorageKey);
    }

    /**
     * Indicated whether the local sotarge has the resume in memory or ngOnInit
     * @return {boolean}
     */
    private memorizedResume(): boolean {
        return localStorage.getItem(this.localStorageKey) != null;
    }
}
