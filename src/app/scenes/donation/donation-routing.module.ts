import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationResolver } from 'src/app/core/resolvers/organisation.resolver';
import { DonationComponent } from './donation/donation.component';

const routes: Routes = [
  {
    path: '',
    component: DonationComponent,
    resolve: { organisation: OrganisationResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
