import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DescriptionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'description',
})
export class DescriptionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    // return value.toLowerCase();
    const pattern = '\\[d\\](.*?)\\[\\/d\\]';
    const regE = new RegExp(pattern);

    try {
      return regE.exec(value)[1];
    } catch (e) {
      return value;
    }
  }
}
