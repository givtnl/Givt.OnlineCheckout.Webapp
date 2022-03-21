import {Injectable} from "@angular/core";
import {PaymentMethodId} from '../models/organisation'
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";

@Injectable()
export class DonationResolver implements Resolve<PaymentMethodId> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethodId> | Promise<PaymentMethodId> | PaymentMethodId {
    let amount = localStorage.getItem('amount');
    let medium = localStorage.getItem('medium');
    return firstValueFrom(this.http.post<PaymentMethodId>('http://localhost:5000/api/donation/intent', {
      "amount": amount,
      "medium": medium,
      'paymentMethod': 1
    }));
  }
}
