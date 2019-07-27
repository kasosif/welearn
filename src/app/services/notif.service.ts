import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notif} from '../models/notif';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {
  url = 'http://localhost/laravel/gestion-scolarite/public/api/notifs';
  constructor(private httpClient: HttpClient) { }
  getNotifs(): Observable<Notif[]> {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get<Notif[]>(this.url, {headers});
  }

  allRead() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.patch(this.url, [], {headers});
  }
}
