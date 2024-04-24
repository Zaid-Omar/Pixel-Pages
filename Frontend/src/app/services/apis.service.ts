import { Injectable } from '@angular/core';
import { ReqRes } from "../entity/ReqRes";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoginEntity } from '../entity/LoginEntity';
import { register } from 'node:module';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
   loginRequestSubject = new BehaviorSubject<boolean>(false);
   vornameSubject = new BehaviorSubject<string>('');
   nachnameSubject = new BehaviorSubject<string>('');
   emailSubject = new BehaviorSubject<string>('');
   passwordSubject = new BehaviorSubject<string>('');
   benutzernameSubject = new BehaviorSubject<string>('');

  loginRequest$  = this.loginRequestSubject.asObservable();
  username$: Observable<string> = this.vornameSubject.asObservable();
  name$: Observable<string> = this.nachnameSubject.asObservable();
  email$: Observable<string> = this.emailSubject.asObservable();
  password$: Observable<string> = this.passwordSubject.asObservable();
  benutzername$: Observable<string> = this.benutzernameSubject.asObservable();

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

//* ---------------------------  AUTH APIS  ---------------------------- *//

  public signIn(loginEntity: LoginEntity): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signin`, loginEntity);
  }

  public signUp(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signup`, registerEntity);
  }

  public refresh(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/refresh`, registerEntity);
  }

//* ---------------------------  USER APIS  ---------------------------- *//

  public addUser(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrluser}/add`, registerEntity)
  }

  public getAllUser(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrluser}/getAll`)
  }

  public getUserByID(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrluser}/getUserById/${registerEntity.id}`)
  }

  public getUserByUsername(user: ReqRes): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrluser}/getUserByEmail`, user);
  }

  // public getUserByBenutzername(user: ReqRes): Observable<ReqRes> {
  //   return this.http.get<ReqRes>(`${this.baseUrluser}/getUserByEmail`, user);
  // }

  // public getUserByUsernameAndEmail(user: ReqRes): Observable<ReqRes> {
  //   return this.http.get<ReqRes>(`${this.baseUrluser}/getByBenutzernameAndEmail`, user);
  // }

  public deleteUserByID(user: ReqRes): Observable<ReqRes> {
    return this.http.delete<ReqRes>(`${this.baseUrluser}/getUserByEmail/${user.id}`);
  }
}
