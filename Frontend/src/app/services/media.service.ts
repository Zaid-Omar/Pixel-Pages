import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { ReqRes } from '../entity/ReqRes';
import { Observable } from 'rxjs';
import { Media } from '../entity/MediaEntity';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService implements OnInit{
  private baseUrl = 'http://localhost:8080/api/media';
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
      console.error('localStorage is not available.');
      // Fallback: Setze leere HttpHeaders
      this.headers = new HttpHeaders();
    }
    this.options = { headers: this.headers };
  }

  //* ---------------------------  MEDIA APIS  ---------------------------- *//

  public getAllMedia(): Observable<Media> {
    return this.http.get<Media>(`${this.baseUrl}/getAll`);
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

  public addMedia(media: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.post<ReqRes>(`${this.baseUrl}/addMedia`, media, this.options);
  }

  public updateMedia(media: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.put<ReqRes>(`${this.baseUrl}/updateMedia`, media, this.options);
  }

  public deleteMediaByID(media: ReqRes): Observable<ReqRes> {
    this.initializeHeaders();
    return this.http.delete<ReqRes>(`${this.baseUrl}/deleteMedia${media}`, this.options);
  }
}
