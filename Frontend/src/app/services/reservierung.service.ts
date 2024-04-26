import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqRes } from '../entity/ReqRes';
import { Component, NgModule } from '@angular/core';

import { Reservierung } from '../entity/ReservierungsEntity';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservierungService implements OnInit {
  private baseUrl = 'http://localhost:8080/api/reservierung';
  private headers: HttpHeaders = new HttpHeaders();
  options: { headers: HttpHeaders } = { headers: this.headers };

  constructor(private http: HttpClient) {
    this.initializeHeaders();
  }

  ngOnInit() {
    this.getAllReservierung();  // Fetch the media list when the component initializes
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
//* ---------------------------  Reservierung APIS  ---------------------------- *//

  public getAllReservierung(): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.get<ReqRes>(`${this.baseUrl}/getAll`, this.options);
  }

  public getByIdReservierung(resv: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.get<ReqRes>(`${this.baseUrl}/getById/${resv}`, this.options);
  }

  public getByUserReservierung(): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.get<ReqRes>(`${this.baseUrl}/getByUser`, this.options);
  }

  public addReservierung(resv: Reservierung): Observable<Reservierung> {
    this.initializeHeaders();
    return this.http.post<Reservierung>(`${this.baseUrl}/add`, resv, this.options);
  }

  public updateReservierung (resv: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.put<ReqRes>(`${this.baseUrl}/update`, resv, this.options);
  }

  public deleteReservierung (resv: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.delete<ReqRes>(`${this.baseUrl}/delete/${resv}`, this.options);
  }
}
