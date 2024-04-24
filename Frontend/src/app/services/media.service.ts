import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqRes } from '../entity/ReqRes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private baseUrl = 'http://localhost:8080/api/media';

  constructor(private http: HttpClient) {}


  //* ---------------------------  MEDIA APIS  ---------------------------- *//

  public getAllMedia(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getAll`);
  }

  public getAllStatusTrueMedia(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getAllStatusTrue`);
  }

  public getByIdMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getById/${media}`);
  }

  public getByTitleMedia(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getByTitle`);
  }

  public addMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/addMedia`, media);
  }

  public updateMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.put<ReqRes>(`${this.baseUrl}/updateMedia`, media);
  }

  public deleteMediaByID(media: ReqRes): Observable<ReqRes> {
    return this.http.delete<ReqRes>(`${this.baseUrl}/deleteMedia${media}`);
  }
}
