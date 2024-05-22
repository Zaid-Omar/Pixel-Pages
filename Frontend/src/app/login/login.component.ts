import { RouterLink, Router } from '@angular/router';
import { ReqRes } from "../entity/ReqRes";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { LoginEntity } from "../entity/LoginEntity";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../entity/UserEntity";
import { Media } from "../entity/MediaEntity";
import { FormGroup } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() dataEvent = new EventEmitter<string>();
  loginForm: FormGroup;
  isSubmitted = false;
  token: any;
  bild: any;
  benutzername: string = '';
  x: number = 0
  refresh: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private prodser: ApisService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwort: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const login: LoginEntity = new LoginEntity(this.loginForm.value.email, this.loginForm.value.passwort);
      this.prodser.signIn(login).subscribe(
        (response: ReqRes) => {
          if (response.token) {
            this.router.navigate(['/refresh']);
            let isLoggedIn = true;
            localStorage.setItem('refresh', this.refresh.toString());
            localStorage.setItem('isLoggedIn', isLoggedIn.toString());
            localStorage.setItem('token', response.token);
            let offer: LoginEntity = new LoginEntity(this.loginForm.value.email, this.loginForm.value.password);
            console.log(offer)
            this.prodser.getUserByUsername(offer).subscribe(
              (userData: ReqRes) => {
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('user_id', JSON.stringify(userData.id));
                this.prodser.updateSharedData(
                  userData.vorname,
                  userData.nachname,
                  userData.email,
                  userData.passwort,
                  userData.benutzername
                );
              }
            );

          } else {
            console.log('Anmeldung fehlgeschlagen');
          }
        },
        error => {
          console.error('Fehler bei der Anmeldung:', error);
        }
      );
    }
  }


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
