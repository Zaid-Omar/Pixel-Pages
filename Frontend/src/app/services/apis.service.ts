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

  loginRequest$ = this.loginRequestSubject.asObservable();
  username$: Observable<string> = this.vornameSubject.asObservable();
  name$: Observable<string> = this.nachnameSubject.asObservable();
  email$: Observable<string> = this.emailSubject.asObservable();
  password$: Observable<string> = this.passwordSubject.asObservable();
  benutzername$: Observable<string> = this.benutzernameSubject.asObservable();

  private baseUrl = 'http://localhost:8080/api/auth';
  private baseUrluser = 'http://localhost:8080/api/user';
  private headers: HttpHeaders = new HttpHeaders();
  options: { headers: HttpHeaders } = { headers: this.headers };

  constructor(private http: HttpClient) {
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
    return this.http.post<ReqRes>(`${this.baseUrluser}/add`, registerEntity, this.options)
  }

  public getAllUser(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrluser}/getAll`, this.options)
  }

  public getUserByID(registerEntity: ReqRes): Observable<ReqRes> {
    return this.http.get<ReqRes>(`${this.baseUrluser}/getUserById/${registerEntity.id}`, this.options)
  }

  public getUserByUsername(user: LoginEntity): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrluser}/getUserByEmail`, user, this.options);
  }

  // public getUserByBenutzername(user: ReqRes): Observable<ReqRes> {
  //   return this.http.get<ReqRes>(`${this.baseUrluser}/getUserByEmail`, user, this.options);
  // }

  // public getUserByUsernameAndEmail(user: ReqRes): Observable<ReqRes> {
  //   return this.http.get<ReqRes>(`${this.baseUrluser}/getByBenutzernameAndEmail`, user, this.options);
  // }

  public deleteUserByID(user: ReqRes): Observable<ReqRes> {
    return this.http.delete<ReqRes>(`${this.baseUrluser}/getUserByEmail/${user.id}`, this.options);
  }
}
