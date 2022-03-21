import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {IncomingOrganisation} from "../models/organisation";
import {catchError, firstValueFrom, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrganisationResolver implements Resolve<IncomingOrganisation> {
  constructor(private http: HttpClient, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IncomingOrganisation | any> | Promise<IncomingOrganisation> | IncomingOrganisation {
    let mediumIdEncoded = route.queryParams['code']
    try {
      return this.http.get<IncomingOrganisation>('http://localhost:5000/api/medium?mediumid=' + atob(mediumIdEncoded))
        .pipe(catchError(async () => {
          await this.router.navigate(["/error"]);
          return of(false)
        }))
    } catch (e) {
      this.router.navigate(["/error"]);
      return of(false)
    }

    //return firstValueFrom(this.http.get<IncomingOrganisation>('http://localhost:5000/api/medium?mediumid=' + atob(mediumIdEncoded)))
  }
}
