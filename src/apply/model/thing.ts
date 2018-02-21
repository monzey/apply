import { Entity as BaseEntity } from './entity';

export class Thing implements BaseEntity {
  id: number;
  name: string;
  description: string;
  url: string;
  repository: any;

  constructor() {
    this.url = '';
  }
}
