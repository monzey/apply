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
    let r: any;

    if (resume != null) {
      // needed to cast the object
      r = new Resume();
      Object.assign(r, resume);
    } else {
      r = resume;
    }

    this.selectedResume.next(r);
    this.saveToLocalStorage(r);
  }

  get selected(): Observable<Resume> {
    return this.selectedResume.asObservable();
  }

  /**
   * Recovers the Resume object from localStorage
   * @return {Resume}
   */
  private retrieveFromLocalStorage(): Resume {
    let resume = new Resume();

    try {
      let object = JSON.parse(localStorage.getItem(this.localStorageKey));

      Object.assign(resume, object);

      return resume;
    } catch (error) {
      return undefined;
    }
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
