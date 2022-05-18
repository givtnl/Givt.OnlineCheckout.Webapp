import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../core/notification/notification.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LoadingService} from "../../../core/services/loading.service";
import {Subject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import mixpanel from "mixpanel-browser";

const receiptOverlayAnimation = [
    trigger('receiptOverlay', [
        state('open', style({
            display: 'block',
            top: '65%'
        })),
        state('closed', style({
            display: 'none',
            top: '105%'
        })),
        transition('open => closed', [animate('.4s')]),
        transition('closed => open', [style({display: 'block'}), animate('.4s')])
    ])]

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss'],
    animations: receiptOverlayAnimation
})
export class ThankYouComponent implements OnInit {
    userWantsReceipt = false;
    param = { organisationName: "" }
    organisationThankYou = ""
    token: string;
    receiptShownChanged: Subject<boolean> = new Subject<boolean>();
    wantKnowMoreLink: string;


    constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private http: HttpClient, private loadingService: LoadingService, private title: Title, private translate: TranslateService) {
        // For string interpolation in localization we need to have an object and no normal string
        // that's why I created the param object
        this.param.organisationName = localStorage.getItem('organisationName')!;
        this.wantKnowMoreLink = localStorage.getItem('wantKnowMoreLink')!;
        this.organisationThankYou = localStorage.getItem('organisationThankYou')!.substring(0, 175);
        this.token = localStorage.getItem('token')!
    }

    ngOnInit(): void {
        this.title.setTitle(this.translate.instant('Page.Title'))
        mixpanel.track('page_load', {page: 'success_page', organisationName: this.param.organisationName})
    }

    closeBackdrop() {
        this.userWantsReceipt = false;
        this.receiptShownChanged.next(this.userWantsReceipt);
    }

    sendEmail($event: string) {
        mixpanel.track('button_pressed', {page: 'success_page', buttonName: 'send_email'})
        const headers = {
            'Authorization': 'Bearer ' + this.token
        }
        this.http.post(environment.apiUrl + '/api/report/singleDonation?email=' + $event, null, {headers: new HttpHeaders(headers)}).subscribe(
            next => {
                this.loadingService.hide();
                this.userWantsReceipt = false;
                this.receiptShownChanged.next(this.userWantsReceipt);
                this.notificationService.success("Email sent!");
            }, error => {
                this.notificationService.error("Something went wrong, please try again")
            }
        )
    }

    downloadApp() {
        mixpanel.track('button_pressed', {page: 'success_page', buttonName: 'download_app'})
        document.location.href = 'https://givtapp.net/download'
    }
}
