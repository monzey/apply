import { Injectable } from '@angular/core';
import { Resume } from '../model/resume';

@Injectable()
export class ResumeSelectorService {
    private readonly localStorageKey = 'resume';
    private selectedResume: Resume;

    constructor() { }

    /**
     * Sets the resume for the app
     * @param {Resume} resume
     */
    selectResume(resume: Resume): void {
        this.selectedResume = resume;
        this.saveToLocalStorage();
    }

    /**
     * Gets the selected resume for the app
     * @return {Resume}
     */
    getSelectedResume(): Resume {
        if (this.selectedResume == null) {
            this.selectedResume = this.retrieveFromLocalStorage();
        }

        return this.selectedResume;
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
