import { Injectable } from '@angular/core';
import { ReqRes } from "../entity/ReqRes";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoginEntity } from '../entity/LoginEntity';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  private loginRequestSubject = new BehaviorSubject<boolean>(false);
  private vornameSubject = new BehaviorSubject<string>('');
  private nachnameSubject = new BehaviorSubject<string>('');
  private emailSubject = new BehaviorSubject<string>('');
  private passwordSubject = new BehaviorSubject<string>('');
  private benutzernameSubject = new BehaviorSubject<string>('');

  loginRequest$  = this.loginRequestSubject.asObservable();
  username$: Observable<string> = this.vornameSubject.asObservable();
  name$: Observable<string> = this.nachnameSubject.asObservable();
  email$: Observable<string> = this.emailSubject.asObservable();
  password$: Observable<string> = this.passwordSubject.asObservable();
  profilePic$: Observable<string> = this.benutzernameSubject.asObservable();

  private baseUrl = 'http://localhost:8080/api/auth';
  private baseUrluser = 'http://localhost:8080/api/user';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}



  updateSharedData(vorname: string, nachname: string, email: string, password: string, benutzername: string) {
    this.vornameSubject.next(vorname);
    this.nachnameSubject.next(nachname);
    this.emailSubject.next(email);
    this.passwordSubject.next(password);
    this.benutzernameSubject.next(benutzername);
  }


  updateLoginRequest(status: boolean) {
    this.loginRequestSubject.next(status);
  }

  public signIn(loginEntity: LoginEntity): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signin`, loginEntity);
  }

  public signUp(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signup`, registerEntity);
  }

  public getUserByUsername(user: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrluser}/getUserByEmail`, user);
  }
}
