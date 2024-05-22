import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { ReqRes } from '../entity/ReqRes';
import { Observable } from 'rxjs';
import { Media } from '../entity/MediaEntity';
import { HttpHeaders } from '@angular/common/http';
import { Vorschlag } from '../entity/VorschlagEntity';
import { VorschlagBekommen } from '../entity/VorschlagBekommenEntity';
@Injectable({
  providedIn: 'root'
})
export class VorschlagService {
  private baseUrl = 'http://localhost:8080/api/vorschlag';
  private headers: HttpHeaders = new HttpHeaders();
  options: { headers: HttpHeaders } = { headers: this.headers };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initializeHeaders();
  }

  private initializeHeaders(): void {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      } else {
        this.headers = new HttpHeaders();
      }
    } else {
      console.error('Kein Token vorhanden!');
      this.headers = new HttpHeaders();
    }
    this.options = { headers: this.headers };
  }

  //* ---------------------------  MEDIA APIS  ---------------------------- *//

  public getAllMedia(): Observable<VorschlagBekommen> {
    this.initializeHeaders();
    return this.http.get<VorschlagBekommen>(`${this.baseUrl}/getAll`, this.options);
  }

  public getAllStatusTrueMedia(): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.get<ReqRes>(`${this.baseUrl}/getAllStatusTrue`, this.options);
  }

  public getByIdMedia(media: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.get<ReqRes>(`${this.baseUrl}/getById/${media}`, this.options);
  }

  public getByTitleMedia(): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.get<ReqRes>(`${this.baseUrl}/getByTitle`, this.options);
  }

  public addMedia(media: Vorschlag): Observable<Vorschlag> {
    this.initializeHeaders();
    return this.http.post<Vorschlag>(`${this.baseUrl}/add`, media, this.options);
  }

  public deleteMediaByID(media: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.delete<ReqRes>(`${this.baseUrl}/delete/${media}`, this.options);
  }
}
