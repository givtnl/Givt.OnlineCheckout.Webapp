import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService, private title: Title) {
    }

    ngOnInit(): void {
        this.title.setTitle(this.translate.instant('Page.Title'))
        if (this.route.snapshot.queryParams['redirect_status'] != null) {
            const redirectStatus = this.route.snapshot.queryParams['redirect_status'];
            if (redirectStatus === 'succeeded') {
                this.router.navigate(['result', 'success'])
            } else if (redirectStatus === 'failed') {
                this.router.navigate(['result', 'failure'])
            }
        }
    }

}
