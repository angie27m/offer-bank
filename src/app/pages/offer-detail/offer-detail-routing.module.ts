import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferDetailComponent } from './offer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OfferDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferDetailRoutingModule { }
