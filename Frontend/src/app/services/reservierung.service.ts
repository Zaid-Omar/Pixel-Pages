import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqRes } from '../entity/ReqRes';
import { Reservierung } from '../entity/ReservierungsEntity';

@Injectable({
  providedIn: 'root'
})
export class ReservierungService {
  private baseUrl = 'http://localhost:8080/api/reservierung';

  constructor(private http: HttpClient) { }

//* ---------------------------  Reservierung APIS  ---------------------------- *//

  public getAllReservierung(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getAll`);
  }

  public getByIdReservierung(resv: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getById/${resv}`);
  }

  public getByUserReservierung(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getByUser`);
  }

  public addReservierung(resv: Reservierung): Observable<Reservierung> {
    return this.http.post<Reservierung>(`${this.baseUrl}/add`, resv);
  }

  public updateReservierung (resv: ReqRes): Observable<ReqRes> {
    return this.http.put<ReqRes>(`${this.baseUrl}/update`, resv);
  }

  public deleteReservierung (resv: ReqRes): Observable<ReqRes> {
    return this.http.delete<ReqRes>(`${this.baseUrl}/delete/${resv}`);
  }
}
