import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { PipesModule } from '../../pipes/pipes.module';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  media: Pic;
  username: string;
  filters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    warmth: 0,
  };
  style = '';
  fileId: any;

  constructor(public mediaProvider: MediaProvider, public navCtrl: NavController,
              public navParams: NavParams, public pipesModule: PipesModule) {
                this.fileId = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
    this.getData();
  }

  getData() {
    this.mediaProvider
      .getSingleMedia(this.fileId)
      .subscribe(res => {
        this.media = res;
      });
    this.checkLogedIn();
  }

  checkLogedIn() {
    /*
    if (this.mediaProvider.loggedIn) {
      this.mediaProvider.fetchUser(this.media.user_id).subscribe(resp => {
      // console.log(resp);
      this.username = resp.username;
      });
    }
    */
   console.log('kierror: ', this.media.user_id);
  }

}
