import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 100) {
      return `${value.slice(0, 100)}...`;
    } else return value
  }

}
