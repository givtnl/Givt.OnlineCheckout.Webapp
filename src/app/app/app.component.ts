import {Component, OnInit} from '@angular/core';

import { LocalStorageService } from "./../core/core.module"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private storageService: LocalStorageService) { }
  ngOnInit(): void {
    this.storageService.testLocalStorage();
  }
}
