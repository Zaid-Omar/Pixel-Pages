import { RouterLink, Router } from '@angular/router';
import { ReqRes } from "../entity/ReqRes";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { LoginEntity } from "../entity/LoginEntity";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../entity/User";
import { Media } from "../entity/MediaEntity";
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() dataEvent = new EventEmitter<string>();
  loginForm: FormGroup;
  token: any;
  bild: any;
  x: number = 0
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private router: Router,
    private prodser: ApisService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async test() {
    if (this.loginForm.valid) {
      const login: LoginEntity = new LoginEntity(this.loginForm.value.email, this.loginForm.value.password);
      this.prodser.signIn(login).subscribe(
        (response: ReqRes) => {
          if (response.token) {
            window.location.reload();
            this.isLoggedIn = true;
            this.prodser.updateLoginRequest(this.isLoggedIn);
            localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
            this.token = response.token;
            localStorage.setItem("token", response.token);
            this.router.navigate(['/']);
             if (this.isLoggedIn) {
             const offer : ReqRes = this.loginForm.value;
             this.prodser.getUserByUsername(offer).subscribe(
             (response: ReqRes) => {
                localStorage.setItem('currentUser', JSON.stringify(response));
               localStorage.setItem('user_id',JSON.stringify(response.id));
                this.prodser.updateSharedData(
                 response.vorname,
                response.nachname,
                response.email,
                 response.passwort,
                 response.benutzername
               );
               console.log(response.vorname,
                 response.nachname,
                 response.email,
                 response.passwort,
                 response.benutzername,
               response.id)

           })
          }
        } else {
          console.log('Anmeldung fehlgeschlagen')
          console.log(this.loginForm.value);
        }
      },
      error => {
        console.error('Fehler bei der Anmeldung:', error);
      }
    );
}}


  public getAllUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const options = { headers: headers };

    this.http.get<User[]>("http://localhost:8080/api/user/getAll", options)
      .subscribe(
        (response: User[]) => {
          console.log(response);
        }
      );
  }

  public getAllMedia() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const options = { headers: headers };
    this.http.get<Media[]>("http://localhost:8080/api/media/getAll", options)
      .subscribe(
        (response: Media[]) => {
          this.bild = `data:image/png;base64,${response[0].bild}`;
          console.log(response);
        }
      );
  }

}
