import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import AmountData from 'src/app/shared/models/donations/amount-data';
import Organisation from 'src/app/shared/models/organisations/organisation';
import PaymentMethod from 'src/app/shared/models/payment-methods/payment-method';
import {LoadingService} from "../../../core/services/loading.service";

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    organisation!: Organisation
    currentSelected!: AmountData
    currentSelectedPaymentMethod: PaymentMethod | undefined
    inputMode = false;
    customAmount = 0;
    mainGiveButtonDisabled = true;
    email = '';
    loading$ = this.loader.loading$;

    constructor(private router: Router, private route: ActivatedRoute, public loader: LoadingService) {
    }

    ngOnInit(): void {
        this.organisation = this.route.snapshot.data['organisation'];
        this.mainGiveButtonDisabled = true
    }

    async submit() {
        this.mainGiveButtonDisabled = true

        if (this.currentSelected.id === 0 && (this.inputMode && this.customAmount === 0)) {
            return
        } else {
            let amount = 0;
            if (this.inputMode) {
                amount = Math.round(this.customAmount * 100) / 100;
                if (!DonationComponent.isValidCustomAmount(amount)) {
                    return
                }
            } else {
                amount = this.currentSelected.value;
            }

            localStorage.setItem('organisationName', this.organisation.name)
            localStorage.setItem('logoUrl', this.organisation.logoLink);
            localStorage.setItem('amount', String(amount));
            if (this.currentSelectedPaymentMethod)
                localStorage.setItem('paymentMethod', this.currentSelectedPaymentMethod.id) // this is to store a number in localstorage
            await this.router.navigate(['/payment']);
        }
    }

    setCurrentSelected(event: AmountData) {
        this.currentSelected = event;
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    setInputMode(inputMode: boolean) {
        this.inputMode = inputMode;
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    saveCustomAmount(customAmount: number) {
        this.customAmount = customAmount;
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    setCurrentSelectedPaymentMethod(event: any) {
        this.currentSelectedPaymentMethod = [...this.organisation.paymentMethods].filter(tile => tile.id == event.target.id).pop();
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    private determineMainButtonDisabled() {
        if (this.inputMode) {
            if (DonationComponent.isValidCustomAmount(this.customAmount)) {
                return this.currentSelectedPaymentMethod === undefined;
            } else {
                return true
            }
        } else {
            return this.currentSelectedPaymentMethod === undefined;
        }
    }

    private static isValidCustomAmount(amount: number): boolean {
        return amount >= .5 && amount <= 25000;
    }
}
