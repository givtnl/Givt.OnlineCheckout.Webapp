import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.component.html',
    styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
    email = "";
    invalidEmail = false;
    emailFormShown: boolean = false;
    @Output()
    onEmailSubmit = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void { }

    showEmailForm() {
        this.emailFormShown = true;
    }

    submitEmail() {
        if (ReceiptComponent.isValidEmail(this.email)) {
            this.emailFormShown = false
            this.onEmailSubmit.emit(this.email)
        } else {
            this.invalidEmail = true;
        }
    }

    emailChanged($event: any) {
        if (this.invalidEmail) this.invalidEmail = false;
        this.email = $event.target.value;
    }

    private static isValidEmail(email: string): boolean {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email.trim())
    }
}
