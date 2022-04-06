import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThankYouComponent} from "./thank-you/thank-you.component";
import {NoThanksComponent} from "./no-thanks/no-thanks.component";

const routes: Routes = [
    {
        path: 'success',
        component: ThankYouComponent,
    },
    {
        path: 'failure',
        component: NoThanksComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ResultRoutingModule {
}
