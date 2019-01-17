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

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  ngOnInit() {
    this.loadPic();
  }

  loadPic() {
    this.http.get('../../assets/test.json').subscribe((result: Pic[]) => {
      this.picArray = result;
      console.log(this.picArray);
    });
  }


}
