import {Injectable} from "@angular/core";
import {PaymentMethodId} from '../models/models'
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class DonationResolver implements Resolve<PaymentMethodId> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethodId> | Promise<PaymentMethodId> | PaymentMethodId {
    let amount = localStorage.getItem('amount');
    let medium = localStorage.getItem('medium');
    let paymentMethod = +localStorage.getItem('paymentMethod')!; // I get the number out of localstorage and sent that to the api
    return firstValueFrom(this.http.post<PaymentMethodId>(environment.apiUrl + '/api/donation/intent', {
      "amount": amount,
      "medium": medium,
      "paymentMethod": paymentMethod
    }));
  }
}
