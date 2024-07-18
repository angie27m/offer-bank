import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AttachmentModel } from 'src/app/models/recruiting.model';

@Component({
  selector: 'app-attachment-download',
  templateUrl: './attachment-download.component.html',
  styleUrls: ['./attachment-download.component.scss']
})
export class AttachmentDownloadComponent implements OnInit {

  @Input()
  attachment!: AttachmentModel | null;

  @Input()
  attachmentFormGroup!: FormGroup;

  @Input()
  attachmentControlName!: string;

  constructor() { }

  ngOnInit() {
  }

  onRemoveAttachment() {
    this.attachment = null;
    this.attachmentFormGroup.get(this.attachmentControlName)?.setValue(null);
  }

  canRemoveAttachment(): boolean {
    if(this.attachmentFormGroup && this.attachmentControlName && this.attachmentFormGroup.get(this.attachmentControlName)) {
      return true;
    }
    return false
  }

}
