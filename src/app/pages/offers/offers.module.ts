import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
