import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, Pic, User } from '../../interfaces/pic';
/*
  Generated class for the MediaProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  // configUrl = 'https://media.mw.metropolia.fi/wbma';
  mediaFilePath = 'api/uploads/';
  picArray: Pic[];

  loggedIn = false;
  user: User = null;

  constructor(public http: HttpClient) {

  }

  getAllMedia() {
    return this.http.get<Pic[]>('/api/media');
  }

  getSingleMedia(id) {
    return this.http.get<Pic>('/api/media/' + id);
  }

  getUserMedia() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.get<Pic[]>('/api/media/user', httpOptions);
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<LoginResponse>('/api/login', user, httpOptions);
  }
  register(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<LoginResponse>('/api/users', user, httpOptions);
  }

  fetchUser = (id: number) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };

    return this.http.get<User>(`/api/users/${id}`, httpOptions);
  }

  checkIfUserExists(user: User) {
    return this.http.get('/api/users/username/' + user.username);
  }

  getFilesByTag(tag: string) {
    // single file
    return this.http.get<Pic[]>('/api/tags/' + tag);
  }

  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.post<LoginResponse>('/api/media', data, httpOptions);
  }


}
