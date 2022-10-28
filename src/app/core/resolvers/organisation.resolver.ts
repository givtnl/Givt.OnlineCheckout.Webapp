import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import OrganisationDto from 'src/app/shared/models/organisations/organisation-dto';
import { LoadingService } from '../services/loading.service';
import Organisation from '../../shared/models/organisations/organisation';

@Injectable()
export class OrganisationResolver implements Resolve<OrganisationDto> {
    constructor(
        private http: HttpClient,
        private router: Router,
        public loader: LoadingService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<OrganisationDto | any>
        | Promise<OrganisationDto>
        | OrganisationDto {
        try {
            let mediumIdEncoded = route.queryParams['code'];
            let mediumIdDecoded = atob(mediumIdEncoded);
            localStorage.setItem('medium', mediumIdDecoded);
            this.loader.show();
            console.log(localStorage.getItem('organisationCountry'));
            let apiUrl =
                localStorage.getItem('organisationCountry') == 'US'
                    ? `${environment.USApiUrl}/api/CollectGroup/medium?Code=`
                    : `${environment.apiUrl}/api/medium?Code=`;
            return this.http
                .get<OrganisationDto>(
                    `${apiUrl}${mediumIdDecoded}&language=${navigator.language}`
                )
                .pipe(
                    map((data) => {
                        if (!data.medium) {
                            data.medium = mediumIdDecoded;
                        }
                        return Organisation.fromOrganisationDto(data);
                    })
                )
                .pipe(
                    catchError(async () => {
                        await this.router.navigate(['/error']);
                        return of(false);
                    })
                )
                .pipe(
                    finalize(() => {
                        this.loader.hide();
                    })
                );
        } catch (e) {
            this.router.navigate(['/not-found']);
            return of(false);
        }
    }
}
