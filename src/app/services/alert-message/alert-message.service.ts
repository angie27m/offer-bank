
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatSnackBarConfig, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AlertMessageComponent } from 'src/app/components/alert-message/alert-message.component';

export class AlertMessage {
  time!: number; // tiempo por defecto que debe mostrarse el mensaje, de caso contrario muestra 8000
  panelclass!: string[]; // define el color del mensaje (success-warn-error)
  constructor(public title: string, public description: string) { }

}

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  public alertMessage$: Subject<AlertMessage> = new Subject();

  constructor(public snackBar: MatSnackBar) {
    this.alertMessage$.subscribe((alertMessage: AlertMessage) => {
      this.openSnackbar(alertMessage);
    });
  }

  /** Muestra el mensaje de success */
  addSuccessMessage(succesMessageTitle: string, successMessageDescription: string) {
    let message = new AlertMessage(succesMessageTitle, successMessageDescription);
    message.panelclass = ['panel-success-message'];
    message.time = environment.snackBarTime;
    this.alertMessage$.next(message);
  }

  /** Muestra el mensaje de success con tiempo establecido */
  addSuccessMessageFull(succesMessageTitle: string, successMessageDescription: string, time: number) {
    let message = new AlertMessage(succesMessageTitle, successMessageDescription);
    message.panelclass = ['panel-success-message'];
    message.time = time;
    this.alertMessage$.next(message);
  }

  /** Muestra el mensaje de warning con tiempo establecido */
  addWarningMessageFull(warningMessageTitle: string, warningMessageDescription: string, time: number) {
    let message = new AlertMessage(warningMessageTitle, warningMessageDescription);
    message.panelclass = ['panel-warn-message'];
    message.time = time;
    this.alertMessage$.next(message);
  }

  /** Muestra el mensaje de warning */
  addWarningMessage(warningMessageTitle: string, warningMessageDescription: string) {
    let message = new AlertMessage(warningMessageTitle, warningMessageDescription);
    message.panelclass = ['panel-warn-message'];
    message.time = environment.snackBarTime;
    this.alertMessage$.next(message);
  }

  /** Muestra el mensaje de error con tiempo establecido */
  addErrorMessageFull(errorMessageTitle: string, errorMessageDescription: string, time: number) {
    let message = new AlertMessage(errorMessageTitle, errorMessageDescription);
    message.panelclass = ['panel-error-message'];
    message.time = time;
    this.alertMessage$.next(message);
  }

  /** Muestra el mensaje de error */
  addErrorMessage(errorMessageTitle: string, errorMessageDescription: string) {
    let message = new AlertMessage(errorMessageTitle, errorMessageDescription);
    message.panelclass = ['panel-error-message'];
    message.time = environment.snackBarTime;
    this.alertMessage$.next(message);
  }

  /** Abre el mensaje de alerta */
  openSnackbar(alertMessage: AlertMessage) {
    const message = { title: alertMessage.title, subtitle: alertMessage.description, type: alertMessage.panelclass };
    this._createConfig(alertMessage.panelclass, alertMessage.time, 'center', 'top', message).subscribe(
      conf => {
        this.snackBar.openFromComponent(AlertMessageComponent, { data: message, ...conf });
      }
    );
  }

  /** Crea la configuración del alert */
  public _createConfig(panelclass: any, dur: number | undefined, hor: MatSnackBarHorizontalPosition | undefined, vert: MatSnackBarVerticalPosition | undefined, dataIn: { title: string; subtitle: string; type: any; }): Observable<any> {
    const confObservable = new Observable(observer => {
      setTimeout(() => {
        if (panelclass == undefined) {
          panelclass = ['panel-success-message'];
        }
        const config = new MatSnackBarConfig();
        config.verticalPosition = vert;
        config.horizontalPosition = hor;
        config.duration = dur;
        config.panelClass = panelclass;
        config.data = dataIn; // Aqui en este objeto se espera algo asi const data = { title: 'title', subtitle: 'subtitle'  };
        observer.next(config);
      }, 1);
    });
    return confObservable;
  }
}