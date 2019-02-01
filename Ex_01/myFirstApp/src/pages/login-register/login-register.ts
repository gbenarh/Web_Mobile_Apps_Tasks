import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';
import { CheckResponse, LoginResponse, User } from '../../interfaces/pic';
import { HomePage } from '../home/home';
import { CheckUsername } from './../../interfaces/pic';

@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',

})
export class LoginRegisterPage {

  user: User = { username: '', full_name: '' };
  showRegister = false;
  confirmUser = '';
  confirmPassword: string;
  regFormOk = false;

  constructor(
              public alertCtrl: AlertController, public navCtrl: NavController,
              public navParams: NavParams, public http: HttpClient,
              public mediaprovider: MediaProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
    this.checkLogin();
  }

  swapButton() {
    this.showRegister = !this.showRegister;
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.mediaprovider.loggedIn = true;
      this.navCtrl.push(HomePage);
    }
  }

  login() {
    this.mediaprovider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaprovider.loggedIn = true;
        localStorage.setItem('token', response.token);
        this.mediaprovider.user = response.user;
        this.navCtrl.parent.select(0);
        this.resetForm();
    },
    error => {
      console.log(error);
    });
  }

  register() {
    this.mediaprovider.checkIfUserExists(this.user).subscribe(
      (response: CheckUsername) => {
        console.log(response);
        this.mediaprovider.register(this.user).subscribe(
          (res: LoginResponse) => {
            this.login();
            console.log(res);
          },
          error => {
            console.log(error);
          });
      },
    error => {
      console.log(error);
    });
  }

  resetForm() {
    this.user.username = '';
    this.user.password = '';
    this.user.full_name = '';
    this.confirmPassword = '';
    this.user.email = '';
  }

  submitReg() {
    this.checkEmail();
    this.checkFullname();
    if (this.user.username === '' || this.user.password === '') {
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Missing password or username.',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.checkPassword();
    }
  }

  checkPassword() {
    if (this.user.password.length < 8) {
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Password must be atleast 8 characters long.',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      if (this.user.password === this.confirmPassword) {
        if (this.regFormOk) {
          this.register();
        }
      } else {
        const alert = this.alertCtrl.create({
          title: 'Warning',
          subTitle: 'Passwords do not match.',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }
  }

  checkUser() {
    this.mediaprovider.checkIfUserExists(this.user).subscribe(
      (response: CheckResponse) => {
        console.log(response);
        if (this.user.username.length >= 3) {
          if (!response.available) {
            const alert = this.alertCtrl.create({
              title: 'Warning',
              subTitle: 'Username already taken.',
              buttons: ['Dismiss']
            });
            alert.present();
            this.user.username = '';
          }
        } else {
          const alert = this.alertCtrl.create({
            title: 'Warning',
            subTitle: 'Username must be atleast 4 characters long.',
            buttons: ['Dismiss']
          });
          alert.present();
          this.user.username = '';
        }
      },
      error => {
        console.log(error);
      });
  }

  checkEmail() {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.user.email.match(mailformat)) {
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'You have entered an invalid email address.',
        buttons: ['Dismiss']
      });
      alert.present();
      this.user.email = '';
    }
  }


  checkFullname() {
    const nameformat = /^[a-zA-Z ]+$/;
    if (this.user.full_name !== '' && !this.user.full_name.match(nameformat)) {
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Your full name contains non alphabetic characters.',
        buttons: ['Dismiss']
      });

      alert.present();
    } else {
      this.regFormOk = true;
      this.user.full_name = '';
    }
  }



}
