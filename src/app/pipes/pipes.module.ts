import { NgModule } from '@angular/core';
import { ExperiencePipe } from './experience/experience.pipe';
import { ContractTypePipe } from './contract-type/contract-type.pipe';



@NgModule({
  declarations: [
    ExperiencePipe,
    ContractTypePipe
  ],
  imports: [
  ],
  exports: [
    ExperiencePipe,
    ContractTypePipe
  ]
})
export class PipesModule { }
