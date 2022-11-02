import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import mixpanel from 'mixpanel-browser';

@Component({
    selector: 'app-no-thanks',
    templateUrl: './no-thanks.component.html',
    styleUrls: ['./no-thanks.component.scss'],
})
export class NoThanksComponent implements OnInit {
    constructor(private router: Router, private elRef: ElementRef) {}

    ngOnInit(): void {
        mixpanel.track('page_load', {
            page: 'failure_page',
            organisationName: localStorage.getItem('organisationName'),
        });
    }

    ngAfterViewInit() {
        this.elRef.nativeElement.ownerDocument.body.style.backgroundColor =
            '#D3726D';
    }

    ngOnDestroy() {
        this.elRef.nativeElement.ownerDocument.body.style.backgroundColor =
            'transparent';
    }

    startOver(): void {
        mixpanel.track('button_pressed', {
            page: 'failure_page',
            buttonName: 'start_over',
        });
        var decodedItem = localStorage.getItem('medium');
        if (decodedItem) {
            localStorage.clear();
            this.router.navigate(['donate'], {
                queryParams: { code: btoa(decodedItem) },
            });
        }
    }
}
