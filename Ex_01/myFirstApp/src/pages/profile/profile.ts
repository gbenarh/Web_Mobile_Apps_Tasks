import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { MyFilesPage } from '../my-files/my-files';

/**
 * Generated class for the LogoutPage page.
 *
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  // TODO: Create a profile method and call it when profile tab gets clicked
  // clear localstorage and update login status in mediaprovider
  // and move back to home page
  logout() {
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.navCtrl.parent.select(0);
  }

  myUploads() {
    this.navCtrl.push(MyFilesPage);
  }

}
