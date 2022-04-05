import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogosComponent} from "./logos/logos.component";


@NgModule({
    declarations: [
        LogosComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LogosComponent
    ]
})
export class SharedModule {
}
