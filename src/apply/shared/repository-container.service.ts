import { Injectable, Injector } from '@angular/core';
import { RepositoryService } from './repository.service';

@Injectable()
export class RepositoryContainerService {

    constructor(private injector: Injector) { }

    /**
     * Gets an instance of a repository based on the name
     * @param {string} name
     * @return {RepositoryService}
     */
    public get(name: string): RepositoryService {
        let repositoryName = `${name}Repository`;

        return this.injector.get(repositoryName);
    }
}
