import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = environment.apiEndPoint;

  constructor(
    private http: HttpClient
  ) { }

  private getHeaders() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', 'Bearer ' + token);
    return headers;
  }

  login(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(this.baseurl + '/login', data, { headers: headers });
  }

  registration(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    return this.http.post(this.baseurl + '/register', data, { headers: headers });
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_at, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
