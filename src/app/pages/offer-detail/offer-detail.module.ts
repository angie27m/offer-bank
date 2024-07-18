import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OfferDetailRoutingModule } from './offer-detail-routing.module';
import { OfferDetailComponent } from './offer-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AttachmentUploadModule } from 'src/app/components/attachment-upload/attachment-upload.module';
import { AlertMessageModule } from 'src/app/components/alert-message/alert-message.module';

@NgModule({
  declarations: [
    OfferDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
    PipesModule,
    OfferDetailRoutingModule,
    MatSelectModule,
    AttachmentUploadModule,
    AlertMessageModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class OfferDetailModule { }
