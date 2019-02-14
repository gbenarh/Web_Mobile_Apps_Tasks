import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs/Observable';
import { Pic, User } from '../../interfaces/pic';
import { PlayerPage } from '../player/player';

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {
  mediaArray: Observable<Pic[]>;

  constructor(public mediaProvider: MediaProvider,
              public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFilesPage');
    this.getMyFiles();
  }

  getMyFiles() {
    this.mediaArray = this.mediaProvider.getUserMedia();
  }

  viewImage(fileId: number) {
    this.navCtrl.push(PlayerPage, { id: fileId });
    // console.log(image);
  }

}
