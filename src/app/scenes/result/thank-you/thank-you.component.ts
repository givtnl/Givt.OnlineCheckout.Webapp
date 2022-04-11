import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../core/notification/notification.service";

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
    userWantsReceipt = false;
    organisationName: string;
    token: string;

    constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) {
        this.organisationName = localStorage.getItem('organisationName')!;
        this.token = localStorage.getItem('token')!
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
        this.userWantsReceipt = false;
        this.notificationService.success("Email sent!");
    }
}
