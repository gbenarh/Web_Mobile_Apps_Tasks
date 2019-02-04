import { Component, ViewChild  } from '@angular/core';
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
  @ViewChild('username') usernameValue;
  @ViewChild('email') emailValue;
  @ViewChild('fullname') fullnameValue;


  user: User = { username: null, full_name: null, email: null, password: null };
  showRegister = false;
  confirmUser = '';
  confirmPassword: string;
  regFormOk = false;
  userAlert = false;

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
      this.userAlert = true;
      this.showAlert('Missing password or username.');
    } else {
      this.checkPassword();
    }
  }

  checkPassword() {
    if (this.user.password !== null && this.user.password.length < 8) {
      this.userAlert = true;
      this.showAlert('Password must be atleast 8 characters long.');
    } else {
      if (this.confirmPassword !== '' && (this.user.password === this.confirmPassword)) {
        if (this.regFormOk) {
          this.register();
        }
      } else {
        if (this.user.password !== null && this.confirmPassword !== null) {
          this.userAlert = true;
          this.showAlert('Passwords do not match.');
        }
      }
    }
  }

  checkUser() {
    if (this.user.username !== null) {
      console.log('user ni: ', this.user.username);
      this.mediaprovider.checkIfUserExists(this.user).subscribe(
        (response: CheckResponse) => {
          console.log(response);
          if (this.user.username.length >= 3) {
            if (!response.available) {
              this.userAlert = true;
              this.usernameValue = true;
              this.showAlert('Username already exists');
              this.user.username = '';
              } else {
                this.userAlert = false;
              }
            } else {
                console.log(Error);
              }
        }
      );
    }
  }

  checkEmail() {
    if (this.user.email !== null) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!this.user.email.match(mailformat)) {
        this.userAlert = true;
        this.emailValue = true;
        this.showAlert('You have entered an invalid email address.');
        this.user.email = '';
      } else {
        // console.log(Error);
      }
    }
  }


  checkFullname() {
    if (this.user.full_name !== null) {
      const nameformat = /^[a-zA-Z ]+$/;
      if (this.user.full_name !== '' && !this.user.full_name.match(nameformat)) {
        this.userAlert = true;
        this.fullnameValue = true;
        this.showAlert('Your full name contains non alphabetic characters.');
        this.user.full_name = '';
      } else {
        this.regFormOk = true;
        this.user.full_name = '';
      }
    }
  }

  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['ok'],
    });
    alert.present().catch();
  }


}
