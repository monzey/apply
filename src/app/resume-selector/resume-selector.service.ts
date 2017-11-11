import { Injectable } from '@angular/core';
import { Resume } from '../model/resume';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResumeSelectorService {
    private readonly localStorageKey = 'resume';
    private selectedResume: ReplaySubject<Resume>;

    constructor() {
        this.selectedResume = new ReplaySubject();
    }

    /**
     * Sets the resume for the app
     * @param {Resume} resume
     */
    selectResume(resume: Resume): void {
        this.selectedResume.next(resume);
        // this.saveToLocalStorage();
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
    private saveToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.selectedResume));
    }

    /**
     * Deletes the selected resume from localStorage
     * @return {void}
     */
    private eraseFromLocalStorage(): void {
        localStorage.removeItem(this.localStorageKey);
    }
}
