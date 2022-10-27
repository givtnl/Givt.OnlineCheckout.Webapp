import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import RegisteredUser from 'src/app/shared/models/user/registered-user';
import TempUser from 'src/app/shared/models/user/temp-user';
import { environment } from 'src/environments/environment';

@Injectable()
export class WePayPaymentService {
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    _rnd = Math.random();
    userId: string = '';
    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private http: HttpClient
    ) {}

    processAnonymousDonation(
        zipcode: string,
        wePayToken: string
    ): Observable<string> {
        const opts: object = {
            responseType: 'text',
        };
        let tempUser = this.createTempUser(zipcode);
        return this.http
            .post<string>(
                `${environment.USApiUrl}/api/v2/users`,
                tempUser,
                opts
            )
            .pipe(
                tap((tempUserId: string) => (this.userId = tempUserId)),
                switchMap((tempUserId: string) => {
                    let regUser = this.createRegisteredUserFromTemp(
                        tempUserId,
                        tempUser
                    );
                    return this.http.post<RegisteredUser>(
                        `${environment.USApiUrl}/api/v2/users/register`,
                        regUser
                    );
                }),
                switchMap((regUser: any) => {
                    // the registered user response is different from my registered user model
                    // thats why i have to use any here because it returns with 'Id' field
                    // instead of userId in my regUser model.
                    let donation = this.getDonationObj(
                        regUser,
                        zipcode,
                        wePayToken
                    );
                    return this.http.post(
                        `${environment.USApiUrl}/api/v2/users/${this.userId}/givts`,
                        donation
                    );
                }),
                switchMap((_) => {
                    let mandate = {
                        paymentMethodToken: wePayToken,
                        userId: this.userId,
                    };
                    return this.http.post<string>(
                        `${environment.USApiUrl}/api/v2/users/${this.userId}/mandates`,
                        mandate,
                        opts
                    );
                }),
                catchError((error) => {
                    throw Error;
                })
            );
    }

    createTempUser(postcode: string): TempUser {
        return {
            Email: this.getRandomGeneratedEmail(),
            IBAN: 'FB66GIVT12345678',
            PhoneNumber: '060000000',
            FirstName: 'John',
            LastName: 'Doe',
            Address: 'Foobarstraat 5',
            City: 'Foobar',
            PostalCode: postcode ?? 'no zipcode',
            Country: 'US',
            Password: 'R4nd0mP@s$w0rd123',
            AmountLimit: 499,
            DeviceOS: 0,
            AppLanguage: 'en',
            TimeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    }

    getRandomGeneratedEmail(): string {
        return `givttest+${this.makeRandomText(5)}@gmail.com`;
    }

    makeRandomText(lengthOfCode: number) {
        let text = '';
        for (let i = 0; i < lengthOfCode; i++) {
            text += this.chars.charAt(
                Math.floor(Math.random() * this.chars.length)
            );
        }
        return text;
    }

    createRegisteredUserFromTemp(
        userId: string,
        tempUser: any
    ): RegisteredUser {
        return {
            userId: userId,
            ...tempUser,
        };
    }

    getDonationObj(
        regUser: RegisteredUser,
        zipcode: string,
        wePayToken: string
    ) {
        return {
            donations: [
                {
                    userId: regUser.userId,
                    amount: window.localStorage.getItem('amount'),
                    collectId: 1,
                    mediumId: window.localStorage.getItem('medium'),
                    timestamp: new Date(),
                },
            ],
            wePayPaymentDetails: {
                zipCode: zipcode,
                paymentMethodToken: wePayToken,
            },
            donationType: 0,
        };
    }
}
