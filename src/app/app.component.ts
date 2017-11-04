import { Component } from '@angular/core';
import { MenuService } from './menu.service';
import { MenuItem } from './menu-item';

@Component({
    selector: 'app-root',
    providers: [MenuService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private menuItems: MenuItem[];

    constructor(private menuService: MenuService) {
        this.menuItems = this.menuService.getLinks();
    }

    ngOnInit() {
    }
}
