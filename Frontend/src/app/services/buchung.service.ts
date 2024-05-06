import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqRes } from '../entity/ReqRes';
import { Component, NgModule } from '@angular/core';

import { Buchung } from '../entity/BuchungsEntity';
import { HttpHeaders } from '@angular/common/http';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { idEntity } from '../entity/idEntity';

@Injectable({
  providedIn: 'root'
})
export class BuchungService {
  private baseUrl = 'http://localhost:8080/api/buchen';
  private headers: HttpHeaders = new HttpHeaders();
  options: { headers: HttpHeaders } = { headers: this.headers };

  constructor(private http: HttpClient) {
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
      console.error('localStorage is not available.');
      // Fallback: Setze leere HttpHeaders
      this.headers = new HttpHeaders();
    }
    this.options = { headers: this.headers };
  }

  //* ---------------------------  Buchung APIS  ---------------------------- *//

  public getAllBuchung(): Observable<FavoriteEntity> {
    this.initializeHeaders();
    return this.http.get<FavoriteEntity>(`${this.baseUrl}/getAll`, this.options);
  }

  public getByIdBuchung(resv: FavoriteEntity): Observable<FavoriteEntity> {
    this.initializeHeaders();
    return this.http.get<FavoriteEntity>(`${this.baseUrl}/getById/${resv}`, this.options);
  }

  public getByUserBuchung(resv: FavoriteEntity): Observable<FavoriteEntity> {
    this.initializeHeaders();
    return this.http.get<FavoriteEntity>(`${this.baseUrl}/getByUserId/${resv}`, this.options);
  }

  public addBuchung(resv: Buchung): Observable<Buchung> {
    this.initializeHeaders();
    return this.http.post<Buchung>(`${this.baseUrl}/add`, resv, this.options);
  }

  public updateBuchung (resv: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.put<ReqRes>(`${this.baseUrl}/update`, resv, this.options);
  }

  public deleteBuchung (resv: FavoriteEntity): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.delete<ReqRes>(`${this.baseUrl}/delete/${resv}`, this.options);
  }
}
