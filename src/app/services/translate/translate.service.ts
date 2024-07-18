import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateServiceLoader implements TranslateLoader {

  constructor(
    private http: HttpClient
  ) {}

  /** Retorna la traducción */
  public getTranslation(lang: string = 'es'): any {
    const apiUrl = `${environment.apiUrl}/companies/0/labels?lang=${lang}`;
    const headersApi = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
    
    return this.http.get<any>(apiUrl, { headers: headersApi })
  }

}

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  constructor(
    private translateService: TranslateService
  ) {}

  getTranslate(label: string): string {
    return this.translateService.instant(label);
  }

}
