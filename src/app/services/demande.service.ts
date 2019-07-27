import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Demande} from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  url = 'http://localhost/laravel/gestion-scolarite/public/api/demandes';
  constructor(private httpClient: HttpClient,
              private router: Router) { }
  sendDemande(demande: Demande) {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.post(this.url, demande, {headers});
  }
  getDemandes() {
    const headers = new HttpHeaders()
        .set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get(this.url, {headers});
  }
}
