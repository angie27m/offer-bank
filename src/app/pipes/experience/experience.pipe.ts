import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experience'
})
export class ExperiencePipe implements PipeTransform {

  transform(value: string): string {
    let experience = '';
    switch (value) {
      case 'WITHOUT_EXPERIENCE':
        experience = 'recruiting.without_experience';
        break;
      case 'LESS_THAN_2_YEARS':
        experience = 'recruiting.less_than_2_years';
        break;
      case 'FROM_2_TO_6_YEARS':
        experience = 'recruiting.from_2_to_6_years';
        break;
      case 'OVER_6_YEARS':
        experience = 'recruiting.over_6_years'
        break;
    }
    return experience;
  }

}
