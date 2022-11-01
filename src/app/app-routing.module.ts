import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './scenes/error/unknown-code/error.component';
import { NotFoundComponent } from './scenes/error/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./scenes/donation/donation.module').then(
                (m) => m.DonationModule
            ),
    },
    {
        path: 'donate',
        loadChildren: () =>
            import('./scenes/donation/donation.module').then(
                (m) => m.DonationModule
            ),
    },
    {
        path: 'registration',
        loadChildren: () =>
            import(
                './scenes/email-registration/email-registration.module'
            ).then((m) => m.EmailRegistrationModule),
    },
    {
        path: 'payment',
        loadChildren: () =>
            import('./scenes/payment/payment.module').then(
                (m) => m.PaymentModule
            ),
    },
    {
        path: 'result',
        loadChildren: () =>
            import('./scenes/result/result.module').then((m) => m.ResultModule),
    },
    {
        path: 'error',
        component: ErrorComponent,
    },
    {
        path: '**' /*redirect to error for all unknown paths*/,
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy',
            useHash: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
