import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersModule)
  },
  {
    path: 'offer',
    loadChildren: () => import('./pages/offer-detail/offer-detail.module').then(m => m.OfferDetailModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
