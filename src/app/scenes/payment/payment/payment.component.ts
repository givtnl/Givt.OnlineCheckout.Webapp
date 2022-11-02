import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import PaymentIntent from '../../../shared/models/payment-intent/payment-intent';
import { LoadingService } from '../../../core/services/loading.service';
import mixpanel from 'mixpanel-browser';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
    paymentMethod: PaymentIntent | undefined;
    loading$ = this.loader.loading$;
    title!: string;
    logoUrl!: string;
    organisationCountry!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public loader: LoadingService,
        private pageTitle: Title,
        private translate: TranslateService
    ) {
        this.organisationCountry = localStorage.getItem('organisationCountry')!;
    }

    ngOnInit(): void {
        this.pageTitle.setTitle(this.translate.instant('Page.Title'));
        mixpanel.track('page_load', {
            page: 'payment_page',
            organisationName: localStorage.getItem('organisationName'),
        });
        this.paymentMethod = this.route.snapshot.data['donation'];
        this.title = localStorage.getItem('organisationTitle')!;
        this.logoUrl = localStorage.getItem('logoUrl')!;
    }
}
