import {HttpClient} from "@angular/common/http";
import {IncomingOrganisation} from "../models/organisation";
import {Injectable} from "@angular/core";
import {firstValueFrom, Observable} from "rxjs";

@Injectable()
export class OrganisationsService {

  constructor(private http: HttpClient) { }

  async getByMediumId(mediumId: string): Promise<IncomingOrganisation> {
    return await firstValueFrom(this.http.get<IncomingOrganisation>('http://localhost:5000/api/medium?mediumid='+mediumId))
  }

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
