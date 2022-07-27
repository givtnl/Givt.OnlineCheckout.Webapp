import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Organisation from 'src/app/shared/models/organisations/organisation';
import {LoadingService} from "../../../core/services/loading.service";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../../core/notification/notification.service";
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import mixpanel from 'mixpanel-browser';
import { environment } from "../../../../environments/environment";



@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    organisation!: Organisation;
    paymentProvider: string;

    constructor(private router: Router, private route: ActivatedRoute, public loader: LoadingService, private http: HttpClient, private notificationService: NotificationService, private translate: TranslateService, private titleService: Title) {
        this.paymentProvider = environment.paymentProvider;
    }

    ngOnInit(): void {
        this.titleService.setTitle(this.translate.instant('Page.Title'));
        this.organisation = this.route.snapshot.data['organisation'];
    }
}
