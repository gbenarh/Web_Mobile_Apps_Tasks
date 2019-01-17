import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  picArray: Pic[] = [];
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public navCtrl: NavController, public http: HttpClient) {

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


}
