import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../core/notification/notification.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LoadingService} from "../../../core/services/loading.service";

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
    userWantsReceipt = false;
    organisationName: string;
    token: string;

    constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private http: HttpClient, private loadingService: LoadingService) {
        this.organisationName = localStorage.getItem('organisationName')!;
        this.token = localStorage.getItem('token')!
    }

    ngOnInit(): void {
    }

    closeBackdrop() {
        this.userWantsReceipt = false;
    }

    sendEmail($event: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.token
        }
        this.http.post(environment.apiUrl + '/api/report/singleDonation?email=' + $event, null, {headers: new HttpHeaders(headers)}).subscribe(
            next => {
                this.loadingService.hide();
                this.userWantsReceipt = false;
                this.notificationService.success("Email sent!");
            }, error => {
                this.notificationService.error("Something went wrong, please try again")
            }
        )
    }

    downloadApp() {
        document.location.href = 'https://givtapp.net/download'
    }
}
