import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import { environment } from "src/environments/environment";
import PaymentMethod from "src/app/shared/models/payment-methods/payment-method";

@Injectable()
export class DonationResolver implements Resolve<PaymentMethod> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethod> | Promise<PaymentMethod> | PaymentMethod {
    let amount = localStorage.getItem('amount');
    let medium = localStorage.getItem('medium');
    let paymentMethod: PaymentMethod = new PaymentMethod(localStorage.getItem('paymentMethod')!)
    return firstValueFrom(this.http.post<PaymentMethod>(environment.apiUrl + '/api/donation/intent', {
      "amount": amount,
      "medium": medium,
      "paymentMethod": paymentMethod
    }));
  }
}
