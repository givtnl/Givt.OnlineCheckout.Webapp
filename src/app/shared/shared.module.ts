import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogosComponent } from './logos/logos.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [LogosComponent],
    imports: [TranslateModule, CommonModule],
    exports: [LogosComponent],
})
export class SharedModule {}
