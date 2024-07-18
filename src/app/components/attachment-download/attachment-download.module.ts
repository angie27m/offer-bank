import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentDownloadComponent } from './attachment-download.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AttachmentDownloadComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
   /*  FontAwesomeModule */
  ],
  exports: [
    AttachmentDownloadComponent
  ]
})
export class AttachmentDownloadModule { }
