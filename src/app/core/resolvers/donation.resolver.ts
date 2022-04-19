import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {finalize, firstValueFrom, Observable} from "rxjs";
import {environment} from "src/environments/environment";
import PaymentIntent from "src/app/shared/models/payment-intent/payment-intent";
import {PaymentMethodType} from "src/app/shared/models/payment-methods/payment-method-enum";
import {LoadingService} from "../services/loading.service";

@Injectable()
export class DonationResolver implements Resolve<PaymentIntent> {
    constructor(private http: HttpClient, public loader: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentIntent> | Promise<PaymentIntent> | PaymentIntent {
        let amount = localStorage.getItem('amount');
        let medium = localStorage.getItem('medium');
        let paymentMethod: PaymentMethodType = +localStorage.getItem('paymentMethod')!;
        this.loader.show();
        return firstValueFrom(this.http.post<PaymentIntent>(environment.apiUrl + '/api/donation/intent', {
            "amount": amount,
            "medium": medium,
            "paymentMethod": paymentMethod,
            "timezoneOffset": new Date().getTimezoneOffset(),
            "currency": "EUR"
        }).pipe(
            finalize(() => {
                this.loader.hide()
            })
        ));
    }
}
