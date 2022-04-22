import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "./../core/core.module"
import {animate, style, transition, trigger} from "@angular/animations";

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
    constructor(private storageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.storageService.testLocalStorage();
    }
}
