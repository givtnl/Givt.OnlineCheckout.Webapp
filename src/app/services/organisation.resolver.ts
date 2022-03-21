import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IncomingOrganisation} from "../models/organisation";
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrganisationResolver implements Resolve<IncomingOrganisation> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IncomingOrganisation> | Promise<IncomingOrganisation> | IncomingOrganisation {
    let mediumIdEncoded = route.queryParams['code']
    return firstValueFrom(this.http.get<IncomingOrganisation>('http://localhost:5000/api/medium?mediumid=' + atob(mediumIdEncoded)))
  }
}
