import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReqRes} from "../entity/ReqRes";
import {RouterLink} from "@angular/router";

@Injectable({
  providedIn: 'root',
})


export class ApisService {

  constructor(private http: HttpClient) { }


  public signIn(reqRes: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>("api/auth/signin", reqRes);
  }



}
