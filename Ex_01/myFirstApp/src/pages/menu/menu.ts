import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { MediaProvider } from '../../providers/media/media';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(
    public mediaProvider: MediaProvider,
    public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
    console.log(this.mediaProvider.loggedIn);
  }

  homeRoot = HomePage;
  loginRoot = LoginRegisterPage;
  profileRoot = ProfilePage;
}
