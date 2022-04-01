import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
    userWantsReceipt = false;
    organisationName: string;

    constructor() {
        this.organisationName = localStorage.getItem('organisationName')!;
    }

    ngOnInit(): void {
    }

    closeBackdrop() {
        this.userWantsReceipt = false;
    }

    sendEmail($event: string) {
        this.userWantsReceipt = false
    }
}
