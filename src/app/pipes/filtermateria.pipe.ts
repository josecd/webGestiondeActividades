import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtermateria'
})
export class FiltermateriaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
