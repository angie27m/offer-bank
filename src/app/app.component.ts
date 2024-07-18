import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor() {
    /** Asigna el color primario de la empresa pr defecto */
    document.documentElement.style.setProperty('--primary', '#0EB1BB');
  }

}
