import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./../core/core.module"
import {animate, style, transition, trigger} from "@angular/animations";
import {TranslateService} from '@ngx-translate/core';

export const routingAnimationsTrigger = trigger('routingAnimations', [
    transition(':enter', [style({opacity: 0}), animate('300ms')]),
    transition(':leave', [animate('300ms'), style({opacity: 0})])
])

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routingAnimationsTrigger]
})
export class AppComponent implements OnInit {
    constructor(private storageService: LocalStorageService, private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.addLangs(['nl', 'de', 'en']);

        var browserLang = translate.getBrowserLang()!;
        if (translate.getLangs().indexOf(browserLang) > -1) {
            translate.use(translate.getBrowserLang()!);
        }
    }

    ngOnInit(): void {
        this.storageService.testLocalStorage();
    }
}
