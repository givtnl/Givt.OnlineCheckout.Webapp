import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";

@Injectable()
export class ApplicationService {
  constructor(private http: HttpClient) { }

  async postDonation(amount: number): Promise<PaymentMethodId> {
    return await firstValueFrom(this.http.post<PaymentMethodId>('http://localhost:5000/api/donation/intent', {
      "amount": amount,
      "medium": "61f7ed014e4c0121c005.c00000000001",
      'paymentMethod': 1
    }));
  }
}

export class PaymentMethodId {
  paymentMethodId: string;

  constructor(paymentMethodId: string) {
    this.paymentMethodId = paymentMethodId;
  }
}
