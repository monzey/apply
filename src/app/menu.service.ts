import { Injectable } from '@angular/core';
import { MenuItem } from './menu-item';

@Injectable()
export class MenuService {

    constructor() { }

    getLinks(): MenuItem[] {
        return [
            new MenuItem('General', '/general', 'build'),
            new MenuItem('Experiences', '/experiences', 'business_center'),
            new MenuItem('Graduations', '/graduations', 'school'),
            new MenuItem('Projects', '/projects', 'whatshot'),
            new MenuItem('Theme', '/theme', 'format_color_fill'),
        ]
    }

}
