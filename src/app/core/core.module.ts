import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { NotificationService } from './notification/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';

export { 
  LocalStorageService,
  NotificationService
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
