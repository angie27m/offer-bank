import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as S3 from 'aws-sdk/clients/s3';
import { AttachmentModel } from 'src/app/models/recruiting.model';
import { environment } from 'src/environments/environment';
import { AbstractControl } from '@angular/forms';

export const AllowedFilesExtensions = [
  '.jpeg', '.jpg', '.png', '.gif', '.pdf', '.xls', '.xlsx', '.doc', '.docx', '.zip', '.rar',
  '.JPEG', '.JPG', '.PNG', '.GIF', '.PDF', '.XLS', '.XLSX', '.DOC', '.DOCX', '.ZIP', '.RAR'
];

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
 
  private attachment!: AttachmentModel;

  constructor(
    private http: HttpClient
  ) {
  }

  uploadAttachment(attachmentData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/tools/attachments`;
    const headersApi = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    return this.http.post<any>(url, attachmentData, {headers: headersApi,
      reportProgress: true,
      observe: 'events'
    }).pipe(map( event => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / (event.total ? event.total : 1));
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          const attachment: AttachmentModel = event.body;
          return attachment;
        default:
            return `Unhandled event: ${event.type}`;
      }
    }));
  }

  /** envia documento a s3 desde angular */
  uploadAttachmentFromAngular(file: File, vacant?: string): Observable<any> {
    const confObservable = new Observable(observer => {
      setTimeout(() => {
        // constante para el bucket que se va a utilizar 
        const bucket = new S3(
          {
              accessKeyId: environment.amazonAccessKey,
              secretAccessKey: environment.amazonSecretKey,
              region: environment.amazonRegion
          }
        );
        const nameFile = new Date().getTime() + "-" + 'postulation-' + vacant;
        const contentType = file.type;
        const url = environment.amazonBucketName+"/"+nameFile;
        // constante para los parametros del bucket y nombre del archivo
        const params = {
            Bucket: environment.amazonBucketName,
            Key: nameFile,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };

        bucket.upload(params, function (err: any, data: any) {
          if (err) {
              console.error('There was an error uploading your file: ', err);
              observer.error(undefined);
              return undefined;
          }
          observer.next(url);
          return url;
        });      
      }, 1);
    });
    return confObservable;    
  }

  /**
   * Salvar el attachment sin subir el documento, 
   * @param attach 
   */
  saveAttachment(attach: AttachmentModel): Observable<any> {
    const apiUrl = `${environment.apiUrl}/tools/attachments`;
    const headersApi = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    return this.http.put(apiUrl, attach, {headers: headersApi})
  }

  /** Validador de archivos */
  static fileValidator(control: AbstractControl) {
    if (control.value) {
      const file: File = control.value;
      let fileExtesionOk = false;
      const fileExtesion = file.name.substring(file.name.lastIndexOf('.'));
      AllowedFilesExtensions.forEach( (fileType => {        
        if (fileExtesion === fileType) {
          fileExtesionOk = true;
        }
      }));
      if (!fileExtesionOk) {
        return {invalidTypeFile: true};
      }
      if (file.size > 10000000) {
        return {invalidFileSize: true};
      }
    }
    return null;
  }

}
