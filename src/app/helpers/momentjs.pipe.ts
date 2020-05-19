import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentjs',
})
export class MomentjsPipe implements PipeTransform {
  constructor() {
    moment.locale('pt-BR');
  }

  transform(value: Date | moment.Moment, dateFormat: string): any {
    return moment(value).format(dateFormat);
  }
}
