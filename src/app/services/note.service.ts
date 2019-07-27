import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url = 'http://localhost/laravel/gestion-scolarite/public/api/notes';
  constructor(private httpClient: HttpClient,
              private router: Router) { }
  getNotes() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
