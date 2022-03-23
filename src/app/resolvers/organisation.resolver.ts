import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { IncomingOrganisation } from "../models/models";
import { catchError, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class OrganisationResolver implements Resolve<IncomingOrganisation> {
  constructor(private http: HttpClient, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IncomingOrganisation | any> | Promise<IncomingOrganisation> | IncomingOrganisation {
    try {
      let mediumIdEncoded = route.queryParams['code'];
      let mediumIdDecoded = atob(mediumIdEncoded);
      localStorage.setItem('medium', mediumIdDecoded);
      return this.http.get<IncomingOrganisation>(environment.apiUrl + '/api/medium?code=' + mediumIdEncoded)
        .pipe(catchError(async () => {
          await this.router.navigate(["/error"]);
          return of(false)
        }))
    } catch (e) {
      this.router.navigate(["/error"]);
      return of(false)
    }
  }
}
