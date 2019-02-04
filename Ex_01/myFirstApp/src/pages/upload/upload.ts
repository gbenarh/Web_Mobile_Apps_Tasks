import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pic, UploadForm } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';


/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  picture: any;
  uploadForm: UploadForm = {};
  fileData = '';
  file: File;
  title = '';
  description = '';
  formData = new FormData();

  constructor(
    public loadingCtrl: LoadingController, private mediaProvider: MediaProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleChange($event) {
    console.log($event.target.files[0]);
    this.file = $event.target.files[0];

    this.showPreview();

    // this.formData.append("file", this.fileData);
    // this.formData.append("title", this.picture.title);
    // this.formData.append("description", this.picture.description);
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      // using arrow fuction to change the reference, if not ==> error of this.
      // console.log(reader.result)
      this.fileData = reader.result;
    };
    if (this.file.type.includes('video')) {
      this.fileData = 'http://via.placeholder.com/500x200/00?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.fileData = 'http://via.placeholder.com/500x200/00?text=Audio';
    } else {
    reader.readAsDataURL(this.file);
    }
  }

  upload() {
    // show spinner
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('title', this.title);
    fd.append('description', this.description);
    this.mediaProvider.upload(fd).subscribe(res => {
      // set time out in 2s
      console.log(res);
      this.Loading();
      // hide spinner
    });
  }

  Loading() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.pop().catch();
      loading.dismiss();
    }, 3000);
  }

}
