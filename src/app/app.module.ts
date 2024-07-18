import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffersService } from './services/offers/offers.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateServiceLoader } from './services/translate/translate.service';
import { AttachmentService } from './services/attachment/attachment.service';
import { AlertMessageService } from './services/alert-message/alert-message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function TranslateLoaderFactory(http: HttpClient) {
  return new TranslateServiceLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSnackBarModule
  ],
  providers: [
    OffersService,
    AttachmentService,
    AlertMessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
