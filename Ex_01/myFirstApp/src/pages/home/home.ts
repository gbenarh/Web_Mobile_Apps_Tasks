import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs/Observable';
import { UploadPage } from '../upload/upload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mediaArray: Observable<Pic[]>;

  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer, public http: HttpClient, private mediaProvider: MediaProvider) {

  }

  ionViewDidEnter() {
    this.getAllFiles();
  }

  /*
  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      console.log('data', data);
      // A:
      /*
      this.picArray = data.map((pic: Pic) => {
        const filename = pic.filename.split('.')[0];
        pic.thumbnails = {
          160: `${filename}-tn160.png`,
          320: `${filename}-tn320.png`,
          640: `${filename}-tn640.png`
        };
        return pic;
      });
     // B:
      data.forEach((pic: Pic) => {
        // add files to picArray
        this.mediaProvider.getSingleMedia(pic.file_id).subscribe((file: Pic) => {
          this.picArray.push(file);
        });
      });
    });
  }
*/

  getAllFiles() {
  this.mediaArray = this.mediaProvider.getAllMedia();
  console.log(this.mediaArray);
}

  showImage(fileId: number) {
    // this.photoViewer.show(image);
    this.mediaProvider.getSingleMedia(fileId).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      },
    );
  }

  upload() {
    this.navCtrl.push(UploadPage);
  }



}
