import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { AttachmentModel } from 'src/app/models/recruiting.model';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { AllowedFilesExtensions, AttachmentService } from 'src/app/services/attachment/attachment.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { LabelService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss']
})
export class AttachmentUploadComponent implements OnInit {

  @Input()
  attachmentFormGroup!: FormGroup;

  @Input()
  attachmentControlName!: string;

  @Input()
  readOnly = false;

  @Input()
  showTitle= true;

  @Input() // Lista de archivos permitidos para cargar 
  listAllowFiles!: string[];
  
  @Input() // Lista de archivos permitidos para cargar 
  sizeAllow!: number;

  @Input() // Lista de archivos permitidos para cargar 
  sizeTypeAllow!: string;

  //Emmitter para retornar el objeto Attachment conla URL y Id del adjunto cargado.
  @Output()
  onFileUploaded = new EventEmitter<AttachmentModel>();

  @Output()
  attachmentFormGroupChange = new EventEmitter<any>();


  fileControl: FormControl;

  inProgress: boolean = false;

  constructor(
    public attachmentService: AttachmentService,
    public labelService: LabelService,
    public alertMessageService: AlertMessageService
  ) {
    this.readOnly = false;
    this.fileControl = new FormControl('', AttachmentService.fileValidator);
  }

  ngOnInit() {
    this.getAllowedFilesExtensions();
  }

  getAllowedFilesExtensions(): string {
    let allowedStr = '';
    // Si el usuario no envia la lista de archivos permitidos, se colocara unos por defecto
    if(this.listAllowFiles!=undefined && this.listAllowFiles.length > 0){
      this.listAllowFiles.forEach((fileType, index) => {
        if (index === 0) {
          allowedStr = fileType;
        } else {
          allowedStr = allowedStr + ', ' + fileType;
        }
      });
    } else {
      AllowedFilesExtensions.forEach((fileType, index) => {
        if (index === 0) {
          allowedStr = fileType;
        } else {
          allowedStr = allowedStr + ', ' + fileType;
        }
      });
    }
    return allowedStr;
  }

  /** Abre el input file para adjuntar */
  openInput() {
      document.getElementById(this.attachmentControlName)?.click();
  }

  /** metodo que responde al boton de cargar */
  onUploadFile(event: any): void {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      const allowedTypes = this.getAllowedFilesExtensions().split(', ');
      let count = 0;
      allowedTypes.map( allowType => {
        if (!file.name.includes(allowType)) {
          count++;
        }
      });
      if (count == allowedTypes.length) {
        this.alertMessageService.addWarningMessage(
          this.labelService.getTranslate('common.file_not_allowed_title'),
          this.labelService.getTranslate('common.file_not_allowed_subtitle')
        );
        return;
      }
      this.fileControl.patchValue(file);
      this.fileControl.updateValueAndValidity();
      this.inProgress = true;
      if ( this.fileControl.valid ) {
        //this.uploadFile(file);
        this.uploadFileAngular(file);
      } else {
        this.fileControl.markAsTouched();
        this.onCancelAttachment();
      }
    }
  }

  /** funcion que carga el archivo */
  uploadFileAngular(file: File) {
    // obtiene el id de la vacante
    const vacantId = this.attachmentFormGroup.get('vacant')?.value;
    // llamado al servicio lambda para cargue de archivo
    this.attachmentService.uploadAttachmentFromAngular(file, vacantId).subscribe(
      (url: any) => {
        // asignar el archivo cargado al formulario definido.
        // hay que guardar la url que se creo en S3 en el objeto attachment.
        var attach = new AttachmentModel();
        attach.name = file.name;
        attach.url = url;
        attach.size = file.size;
        attach.type = file.type;
        this.attachmentService.saveAttachment(attach).subscribe(
          (res: any) => {
            if (res.id) {
              this.assignAttachment(res);
            }
          },
          (err) => {
            console.error(err);
            this.onCancelAttachment();
          }
        );
      },
      (err) => {
        this.onCancelAttachment();
      }
    );
  }

  /** funcion que carga el archivo */
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    // llamado al servicio lambda para cargue de archivo
    this.attachmentService.uploadAttachment(formData).subscribe(
      (res: AttachmentModel) => {
        if (res.id) {
          this.assignAttachment(res);
        }
      },
      (err) => {
        this.onCancelAttachment();
      }
    );
  }

  assignAttachment(attachment: AttachmentModel) {
    //agrear objeto attacment al formGroup
    this.attachmentFormGroup.get(this.attachmentControlName)?.setValue(attachment);
    // retornar con el @output el objeto attachment
    this.onFileUploaded.emit(attachment);
    this.inProgress = false;
  }

  onCancelAttachment() {
    this.attachmentFormGroup.get(this.attachmentControlName)?.setValue(null);
    this.inProgress = false;
  }

  isFileUploaded(): boolean {
    if (this.getAttachmentResult()) {
      return true;
    }
    return false;
  }

  getAttachmentResult(): AttachmentModel {
    return this.attachmentFormGroup.get(this.attachmentControlName)?.value;
  }

  getErrorMessage(control: AbstractControl) {
    // Hace uso de un servicio que se encarga de estadarizar los mensajes de error en todo el sistema
    // Por cada Error en el control (Campo) se genera un menaje
    for (let propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName) && control.touched) {
        // Envia el nombre de la propiedad que tiene error y el compoenente para generar el mensaje adecuado
        return OffersService.getTranslatedValidatorErrorMessage(propertyName, this.labelService, control.errors[propertyName]);
      }
    }
  }

}
