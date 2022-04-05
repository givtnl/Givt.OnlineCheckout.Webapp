import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
    userWantsReceipt = false;
    organisationName: string;

    constructor(private route: ActivatedRoute, private router: Router) {
        this.organisationName = localStorage.getItem('organisationName')!;
    }

    ngOnInit(): void {
        if (this.route.snapshot.queryParams['redirect_status'] === 'failed') {
            this.router.navigate(['result', 'failure'])
        }
    }

    closeBackdrop() {
        this.userWantsReceipt = false;
    }

    sendEmail($event: string) {
        this.userWantsReceipt = false
    }
}
