import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
    selector: 'email-registration',
    templateUrl: './email-registration.component.html',
    styleUrls: ['./email-registration.component.scss'],
})
export class EmailRegistrationComponent implements OnInit {
    loading$ = this.loader.loading$;
    modalOpen = false;
    email: string = '';
    constructor(public loader: LoadingService, private router: Router) {}

    ngOnInit(): void {}

    openModal() {
        this.modalOpen = true;
        // this.errorText = modalText;
    }

    closeModal() {
        this.modalOpen = false;
        //  this.callToCanUseWalletDone = true;
    }

    routeToPayment() {
        localStorage.removeItem('email');
        this.router.navigate(['/payment']);
    }

    submit() {
        localStorage.setItem('email', this.email);
        this.router.navigate(['/payment']);
    }
}
