import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-thanks',
  templateUrl: './no-thanks.component.html',
  styleUrls: ['./no-thanks.component.scss']
})
export class NoThanksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startOver(): void {
    this.router.navigate(
      ['donate'],
      {
        queryParams: { code: 'NjFmN2VkMDE0ZTRjMDEyMWMwMDUuYzAwMDAwMDAwMDAx' },
      }
    );
  }

}
