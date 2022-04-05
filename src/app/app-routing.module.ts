import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './scenes/error/error.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./scenes/donation/donation.module').then((m) => m.DonationModule)

    },
    {
        path: 'payment',
        loadChildren: () =>
            import('./scenes/payment/payment.module').then((m) => m.PaymentModule)
    },
    {
        path: 'result',
        loadChildren: () =>
            import('./scenes/result/result.module').then((m) => m.ResultModule)
    },
    {
        path: 'error',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy'
        })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
