import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, finalize, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import OrganisationDto from "src/app/shared/models/organisations/organisation-dto";
import {LoadingService} from "../loading.service";

@Injectable()
export class OrganisationResolver implements Resolve<OrganisationDto> {
    constructor(private http: HttpClient, private router: Router, public loader: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrganisationDto | any> | Promise<OrganisationDto> | OrganisationDto {
        try {
            let mediumIdEncoded = route.queryParams['code'];
            let mediumIdDecoded = atob(mediumIdEncoded);
            localStorage.setItem('medium', mediumIdDecoded);
            this.loader.show();
            return this.http.get<OrganisationDto>(environment.apiUrl + '/api/medium?code=' + mediumIdDecoded + '&locale=' + navigator.language)
                .pipe(catchError(async () => {
                    await this.router.navigate(["/error"]);
                    return of(false)
                }))
                .pipe(finalize(() => {
                    this.loader.hide()
                }))
        } catch (e) {
            this.router.navigate(["/error"]);
            return of(false)
        }
    }
}
