import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
  url = 'http://localhost/laravel/gestion-scolarite/public/api/niveaux';
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getNiveaux() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
