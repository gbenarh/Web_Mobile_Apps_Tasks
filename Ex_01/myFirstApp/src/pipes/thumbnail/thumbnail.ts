import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/pic';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  // pure: false,
})
export class ThumbnailPipe implements PipeTransform {
  private thumbnail = '';
  private cahchedId;

  constructor(private mediaProvider: MediaProvider) {

  }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(id: number, ...args) {
    console.log(args[0]);
    // impure version:
    /*
    if (this.cahchedId !== id) {
       this.cahchedId = id;
       this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
         switch (args[0]) {
           case 'large':
             this.thumbnail = response.thumbnails.w640;
             break;
           case 'medium':
             this.thumbnail = response.thumbnails.w320;
             break;
           case 'screenshot':
             this.thumbnail = response.screenshot;
             break;
           default:
             this.thumbnail = response.thumbnails.w160;
         }

       });
     }
     return this.thumbnail;
     */

    // pure version:c
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
        const url = this.mediaProvider.mediaFilePath;

        if (response.thumbnails) {
          switch (args[0]) {
            case 'large':
              resolve(`${url}/${response.thumbnails.w640}`);
              break;
            case 'medium':
              resolve(`${url}/${response.thumbnails.w320}`);
              break;
            case 'screenshot':
              resolve(`${url}/${response.screenshot}`);
              break;
            default:
              resolve(`${url}/${response.thumbnails.w160}`);
          }
        } else {
          resolve(`https://icons-for-free.com/free-icons/png/512/1891017.png`);
        }
      });
    });
  }
}
