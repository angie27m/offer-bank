import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contractType'
})
export class ContractTypePipe implements PipeTransform {

  transform(value: string): string {
    let contractType = '';
    switch (value) {
      case 'APPRENTICESHIP':
        contractType = 'recruiting.apprenticeship';
        break;
      case 'WORK_OR_LABOR':
        contractType = 'recruiting.work_or_labor';
        break;
      case 'PROVISION_OF_SERVICES':
        contractType = 'recruiting.provision_of_services';
        break;
      case 'FIXED_TERM':
        contractType = 'recruiting.fixed_term'
        break;
      case 'INDEFINITE_TERM':
        contractType = 'recruiting.indefinite_term'
        break;
      case 'TRIAL_PERIOD':
        contractType = 'recruiting.trial_period'
        break;
      case 'SEASONAL':
        contractType = 'recruiting.seasonal'
        break;
      case 'OCCASIONAL_WORK':
        contractType = 'recruiting.occasional_work'
        break;
      case 'OTHER':
        contractType = 'recruiting.other'
        break;
    }
    return contractType;
  }

}
