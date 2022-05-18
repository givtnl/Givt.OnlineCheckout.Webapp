import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import mixpanel from "mixpanel-browser";

@Component({
    selector: 'app-no-thanks',
    templateUrl: './no-thanks.component.html',
    styleUrls: ['./no-thanks.component.scss']
})
export class NoThanksComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        mixpanel.track('page_load', {page: 'failure_page', organisationName: localStorage.getItem('organisationName')})
    }

    startOver(): void {
        mixpanel.track('button_pressed', {page: 'failure_page', buttonName: 'start_over'})
        var decodedItem = localStorage.getItem('medium');
        if (decodedItem) {
            localStorage.clear();
            this.router.navigate(
                ['donate'],
                {
                    queryParams: {code: btoa(decodedItem)},
                }
            );
        }
    }

}
