import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log(this.route.snapshot.queryParams['redirect_status']);
        if (this.route.snapshot.queryParams['redirect_status'] != null) {
            const redirectStatus = this.route.snapshot.queryParams['redirect_status'];
            console.log(redirectStatus)
            if (redirectStatus === 'succeeded') {
                this.router.navigate(['result', 'success'])
            } else if (redirectStatus === 'failed') {
                this.router.navigate(['result', 'failure'])
            }
        }
    }

}
