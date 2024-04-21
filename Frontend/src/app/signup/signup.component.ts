import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {LoginEntity} from "../entity/LoginEntity";
import {ReqRes} from "../entity/ReqRes";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {User} from "../entity/User";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  vorname:any;
  nachname:any;
  benutzername: any;
  email: any;
  passwort: any;
  token: any;
  bild:any;
  ok=false;
  constructor(private http: HttpClient) {}


  public signUp(): void {
    const signUp = new User(0,this.vorname,this.nachname,this.benutzername,this.email,this.passwort,null);
    this.http.post<ReqRes>("http://localhost:8080/api/auth/signup", signUp)
      .subscribe(
        (response: ReqRes) => {
          console.log("tmm abi");
        },
        error => {
          console.error('Fehler bei der Anmeldung:', error);
        }
      );
  }



}
