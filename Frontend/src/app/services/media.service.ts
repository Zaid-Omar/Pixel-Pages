import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqRes } from '../entity/ReqRes';
import { Observable } from 'rxjs';
import { Media } from '../entity/MediaEntity';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private baseUrl = 'http://localhost:8080/api/media';
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}


  //* ---------------------------  MEDIA APIS  ---------------------------- *//

  public getAllMedia(): Observable<Media> {
    return this.http.get<Media>(`${this.baseUrl}/getAll`, this.options);
  }

  public getAllStatusTrueMedia(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getAllStatusTrue`, this.options);
  }

  public getByIdMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getById/${media}`, this.options);
  }

  public getByTitleMedia(): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrl}/getByTitle`, this.options);
  }

  public addMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/addMedia`, media, this.options);
  }

  public updateMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.put<ReqRes>(`${this.baseUrl}/updateMedia`, media, this.options);
  }

  public deleteMediaByID(media: ReqRes): Observable<ReqRes> {
    return this.http.delete<ReqRes>(`${this.baseUrl}/deleteMedia${media}`, this.options);
  }
}
