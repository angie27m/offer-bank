import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentUploadComponent } from './attachment-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { AttachmentDownloadModule } from '../attachment-download/attachment-download.module';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AttachmentUploadComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    AttachmentDownloadModule,
    MatIconModule
  ],
  exports: [
    AttachmentUploadComponent
  ]
})
export class AttachmentUploadModule { }
