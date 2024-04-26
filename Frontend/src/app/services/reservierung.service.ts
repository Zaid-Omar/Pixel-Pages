import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqRes } from '../entity/ReqRes';
import { Reservierung } from '../entity/ReservierungsEntity';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservierungService {
  private baseUrl = 'http://localhost:8080/api/reservierung';
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
//* ---------------------------  Reservierung APIS  ---------------------------- *//

  public getAllReservierung(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getAll`, this.options);
  }

  public getByIdReservierung(resv: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getById/${resv}`, this.options);
  }

  public getByUserReservierung(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getByUser`, this.options);
  }

  public addReservierung(resv: Reservierung): Observable<Reservierung> {
    return this.http.post<Reservierung>(`${this.baseUrl}/add`, resv, this.options);
  }

  public updateReservierung (resv: ReqRes): Observable<ReqRes> {
    return this.http.put<ReqRes>(`${this.baseUrl}/update`, resv, this.options);
  }

  public deleteReservierung (resv: ReqRes): Observable<ReqRes> {
    return this.http.delete<ReqRes>(`${this.baseUrl}/delete/${resv}`, this.options);
  }
}
