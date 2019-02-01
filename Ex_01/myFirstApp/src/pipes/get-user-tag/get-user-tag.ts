import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/pic';

/**
 * Generated class for the GetUserTagPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'getUserTag',
})
export class GetUserTagPipe implements PipeTransform {
  constructor(public mediaProvider: MediaProvider) {

  }

  async transform(tag: string) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getFilesByTag(tag).subscribe((files: Pic[]) => {
        files.forEach((file: Pic) => {
          if (file.user_id === this.mediaProvider.user.user_id) {
            resolve(file.file_id);
          } else {
              // reject('No profile image added.');
            }
        });
      });
    });
  }
}
