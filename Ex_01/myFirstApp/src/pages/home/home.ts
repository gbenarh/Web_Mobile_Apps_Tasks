import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  picArray: Pic[] = [];
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';


  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer, public http: HttpClient) {

  }

  ngOnInit() {
    this.loadPic();
  }

  loadPic() {
    this.http.get<Pic[]>('https://media.mw.metropolia.fi/wbma/media').subscribe((result: Pic[]) => {
    this.picArray = result;
    console.log(this.picArray);
    });
  }

  fullscreenImage(linkImage: string) {
    this.photoViewer.show(this.url + linkImage);
  }


}
