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
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });
  options = { headers: this.headers };


  constructor(private http: HttpClient) { }

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
