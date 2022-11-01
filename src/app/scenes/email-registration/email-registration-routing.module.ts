import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailRegistrationComponent } from './email-registration/email-registration.component';

const routes: Routes = [
    {
        path: '',
        component: EmailRegistrationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmailRegistrationRoutingModule {}
