import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqRes } from '../entity/ReqRes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private baseUrl = 'http://localhost:8080/api/media/';

  constructor(private http: HttpClient) {}


  //* ---------------------------  MEDIA APIS  ---------------------------- *//
  public getAllMedia(media: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signin`, media);
  }
}
