import { RepositoryService } from '../shared/repository.service';

export function Entity<T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log('decorator');
    return class extends constructor {
        repository = 'tamer';
    }
}

