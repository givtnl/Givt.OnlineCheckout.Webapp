import {HttpClient} from "@angular/common/http";
import {IncomingOrganisation} from "../models/organisation";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class OrganisationsService {

  constructor(private http: HttpClient) { }

  getByMediumId(mediumId: string): Observable<any> {
     return this.http.get<IncomingOrganisation>('http://localhost:5000/api/medium?mediumid='+mediumId)
  }

  async postDonation(amount: number) {
    let paymentMethodId = ""
    await this.http.post('http://localhost:5000/api/donation/intent', {
      "amount": amount,
      "medium": "61f7ed014e4c0121c005.c00000000001",
      'paymentMethod': 1
    }).subscribe(res => {
        var paymentMethodIdWrapped: { 'paymentMethodId': string } = res as { 'paymentMethodId': string };
        return paymentMethodId = paymentMethodIdWrapped.paymentMethodId;
      });
  }

}
