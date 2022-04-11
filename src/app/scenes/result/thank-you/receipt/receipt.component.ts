import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {LoadingService} from "../../../../core/services/loading.service";
import {environment} from "../../../../../environments/environment";
import {NotificationService} from "../../../../core/notification/notification.service";

@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.component.html',
    styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
    @Input()
    token!: string;
    email = "";
    invalidEmail = false;
    emailFormShown: boolean = false;
    @Output()
    onEmailSubmit = new EventEmitter<string>();
    loading$ = this.loadingService.loading$;

    constructor(private http: HttpClient, private loadingService: LoadingService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    showEmailForm() {
        this.emailFormShown = true;
    }

    submitEmail() {
        if (ReceiptComponent.isValidEmail(this.email)) {
            this.loadingService.show()
            this.http.get(environment.apiUrl + '/api/validate/email?email=' + this.email).subscribe(
                () => {
                    this.loadingService.hide();
                    this.emailFormShown = false;
                    this.onEmailSubmit.emit(this.email);
                }, (error) => {
                    this.loadingService.hide();
                    this.invalidEmail = true;
                    this.notificationService.error("Something was wrong with your email address"); //todo: refill the email into the input element
                }
            )
        } else {
            this.invalidEmail = true;
            this.notificationService.error("Something is wrong with your email address");
        }
    }

    emailChanged($event: any) {
        if (this.invalidEmail) this.invalidEmail = false;
        this.email = $event.target.value;
    }


    downloadReport() {
        this.loadingService.show();
        const headers = {
            'Authorization': 'Bearer ' + this.token
        }
        this.http.get(environment.apiUrl + '/api/report/singleDonation', {observe: "response", responseType: "blob", headers: new HttpHeaders(headers)}).subscribe(
            response => {
                this.downloadFile(response.body!)
                this.loadingService.hide();
            }, error => {
                this.notificationService.error('something went wrong, please try again in a few minutes')
                this.loadingService.hide();
            }
        )
    }

    private downloadFile(data: Blob) {
        const url = window.URL.createObjectURL(data);
        window.open(url);
    }

    private static isValidEmail(email: string): boolean {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email.trim())
    }
}
