import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LabelService } from '../translate/translate.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private http: HttpClient
  ) { }

  /** Obtiene una vacante mediante su ID */
  getVacantById(vacantId: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/recruiting/vacants/`;
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('vid', encodeURIComponent(vacantId));
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get<any>(apiUrl,  {params:params, headers: headers } )
  }

  /** Consulta la configuración de la empresa */
  getCompanyConfiguration(companyId: number): Observable<any> {
    const apiUrl = `${environment.apiUrl}/companies/${companyId}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get<any>(apiUrl, {headers: headers})
  }

  /** Retorna el mensaje de error en los formularios */
  static getTranslatedValidatorErrorMessage(validatorName: string, labelService: LabelService, validatorValue?: any) {
    var options = { hour12: false };  

    const config: any = {
      required: labelService.getTranslate('common.required_field').toString(),
      minlength: `${labelService.getTranslate('common.minimum_length_part_1')} ${validatorValue.requiredLength} ${labelService.getTranslate('common.minimum_length_part_2')}`,
      maxlength: `${labelService.getTranslate('common.max_length_part_1')} ${validatorValue.requiredLength} ${labelService.getTranslate('common.minimum_length_part_2')}`,
      min: `${labelService.getTranslate('common.minimum_value_length_part_1')} ${validatorValue.min} `,
      max: `${labelService.getTranslate('common.max_value_length_part_1')} ${validatorValue.max} `,
      matDatepickerMin: `${labelService.getTranslate('common.date_cant_be_less_than')} ${new Date(validatorValue.min).toLocaleDateString('en-US', options)}`,
      invalidHour: `${labelService.getTranslate('common.hour_cant_be_less_than')} ${new Date().toLocaleTimeString('en-US', options)}`,
      invalidTypeFile: `${labelService.getTranslate('common.invalid_file_type_error')}`,
      invalidFileSize: `${labelService.getTranslate('common.file_size_greater_than_10mb_error')}`,
      atLeastOneChecked: `${labelService.getTranslate('homeoffice.at_least_one_checked')}`,
      duplicatedPeriodName: `${labelService.getTranslate('okrs.duplicated_period_name_error')}`,
      invalidPeriodDatesRage: `${labelService.getTranslate('okrs.invalid_dates_warning_desc')}`,
      noWhiteSpace: `${labelService.getTranslate('common.no_whitespace_allowed')}`,
      pattern: `${labelService.getTranslate('common.pattern')}`,
    };

    return config[validatorName];
  }

  /** Guarda la postulación */
  sendPostulation(companyId: number, postulation: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/recruiting/${companyId}/postulations`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.post<any>(apiUrl, postulation, { headers: headers } )
  }

  /** retorna las opciones de plataforma para ¿donde se entero de la oferta? */
  getPlatforms(): Observable<any> {
    const apiUrl = `${environment.apiUrl}/recruiting/platforms`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get<any>(apiUrl, { headers: headers } )
  }

}
