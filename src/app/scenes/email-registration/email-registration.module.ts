import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { EmailRegistrationRoutingModule } from './email-registration-routing.module';
import { EmailRegistrationComponent } from './email-registration/email-registration.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [EmailRegistrationComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        EmailRegistrationRoutingModule,
        MatProgressSpinnerModule,
        MatIconModule,
        TranslateModule,
    ],
})
export class EmailRegistrationModule {}
