import {Component, Injectable} from '@angular/core';
import {ReqRes} from "../entity/ReqRes";
import {RouterLink} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { NumberSymbol } from '@angular/common';
import { User } from '../entity/User';
import { LoginEntity } from '../entity/LoginEntity';
import { RegisterEntity } from '../entity/RegisterEntity';


@Injectable({
  providedIn: 'root',
})

export class ApisService {
  //private loginRequestSubject = new BehaviorSubject<boolean>(false);
  //loginRequest$ = this.loginRequestSubject.asObservable();


  private vornameSubject = new BehaviorSubject<string>('');
  private nachnameSubject = new BehaviorSubject<string>('');
  private emailSubject = new BehaviorSubject<string>('');
  private passwordSubject = new BehaviorSubject<string>('');
  private benutzernameSubject = new BehaviorSubject<string>('');


  username$: Observable<string> = this.vornameSubject.asObservable();
  name$: Observable<string> = this.nachnameSubject.asObservable();
  email$: Observable<string> = this.emailSubject.asObservable();
  password$: Observable<string> = this.passwordSubject.asObservable();
  profilePic$: Observable<string> = this.benutzernameSubject.asObservable();

  constructor(private http: HttpClient) { }
  updateSharedData(vorname: string, nanachname: string, email: string, password: string, benutzername: string) {
    this.vornameSubject.next(vorname);
    this.nachnameSubject.next(nanachname);
    this.emailSubject.next(email);
    this.passwordSubject.next(password);
    this.benutzernameSubject.next(benutzername);
    }

  private baseUrl = 'http://localhost:8080/api/auth'

  public signIn(loginEntity: LoginEntity): Observable<ReqRes> {

    return this.http.post<ReqRes>(`${this.baseUrl}/signin`, loginEntity);
  }

  public signUp(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signup`, registerEntity);
  }

}
