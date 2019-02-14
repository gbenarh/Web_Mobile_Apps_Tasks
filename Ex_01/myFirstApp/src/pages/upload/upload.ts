import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Chooser } from '@ionic-native/chooser';
import { MediaProvider } from '../../providers/media/media';
import { NgForm } from '@angular/forms';


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
  @ViewChild('uForm') uForm: NgForm;

  blob: any;
  file: File;
  title = '';
  description = '';
  formData = new FormData();
  filters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    warmth: 0,
  };

  constructor(
    private chooser: Chooser, public loadingCtrl: LoadingController, private mediaProvider: MediaProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
/*
  handleChange($event) {
    // console.log($event.target.files);
    // get the file from $event
    this.file = $event.target.files[0];
    // call showPreview
    this.showPreview();
  }
*/
  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      // using arrow fuction to change the reference, if not ==> error of this.
      // console.log(reader.result)
      this.blob = reader.result;
    };

    if (this.file.type.includes('video')) {
      this.blob = 'http://via.placeholder.com/500x200/00?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.blob = 'http://via.placeholder.com/500x200/00?text=Audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }

  upload() {
    const description = `[d]${this.description}[/d]`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;
    // show spinner
    this.Loading();
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('title', this.title);
    fd.append('description', description + filters);
    this.mediaProvider.upload(fd).subscribe(res => {
      // set time out in 2s
      console.log(res);
      this.Loading();
      // hide spinner
    });
  }

  Choose() {
    this.chooser.getFile('image/*, video/*, audio/*').then(file => {
      if (!file) return;
      else {
      this.blob = new Blob([file.data], {
          type: file.mediaType
        });
      this.showPreview();

    }}).catch((error: any) => console.error(error));

  }

  Clear = () => {
    this.title = '';
    this.description = '';
    this.file = null;
    this.blob = '';

    this.filters = {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    };
  }


  Loading() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().catch();

    setTimeout(() => {
      this.navCtrl.pop().catch();
      loading.dismiss().catch();
    }, 3000);
  }

}
