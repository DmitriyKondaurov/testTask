import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 150) {
      return `${value.slice(0, 150)}...`;
    } else return value
  }

}
