import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import AmountData from 'src/app/shared/models/donations/amount-data';
import Organisation from 'src/app/shared/models/organisations/organisation';
import {PaymentMethodType} from 'src/app/shared/models/payment-methods/payment-method-enum';
import PaymentMethodTile from 'src/app/shared/models/payment-methods/payment-method-tile';
import {LoadingService} from "../../../core/services/loading.service";

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    organisation!: Organisation
    currentSelected!: AmountData
    currentSelectedPaymentMethod: PaymentMethodTile | undefined
    inputMode = false;
    customAmount = 0;
    mainGiveButtonDisabled = true;
    email = '';
    loading$ = this.loader.loading$;

    private imgFolder = "../../../assets/paymentMethodIcons/"

    paymentMethods: PaymentMethodTile[] = [
        new PaymentMethodTile("id", "Ideal", this.imgFolder + "ideal.svg", PaymentMethodType.Ideal),
        new PaymentMethodTile("ap", "Apple Pay", this.imgFolder + "apay.svg", PaymentMethodType.Card),
        new PaymentMethodTile("gp", "Google Pay", this.imgFolder + "gpay.svg", PaymentMethodType.Card),
        new PaymentMethodTile("cc", "Credit card", this.imgFolder + "cc.svg", PaymentMethodType.Card)
    ]

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
            localStorage.setItem('amount', String(amount));
            if (this.currentSelectedPaymentMethod)
                localStorage.setItem('paymentMethod', this.currentSelectedPaymentMethod.paymentMethod.toString()) // this is to store a number in localstorage
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
        let paymentMethodsCopy = [...this.paymentMethods]
        this.currentSelectedPaymentMethod = paymentMethodsCopy.filter(tile => tile.id == event.target.id).pop();
        if (this.currentSelectedPaymentMethod?.id == "ap" || this.currentSelectedPaymentMethod?.id == "gp") {
            document.getElementById("main-button")!.innerHTML = "give";
        } else {
            document.getElementById("main-button")!.innerHTML = "continue";
        }
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
