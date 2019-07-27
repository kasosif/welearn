import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  url = 'http://localhost/laravel/gestion-scolarite/public/api/etudiants';
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getEtudiantsFromServer() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }

  getEtudiantsByNiveau(niveau_id) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url + '/niveau/' + niveau_id, {headers});
  }
}
