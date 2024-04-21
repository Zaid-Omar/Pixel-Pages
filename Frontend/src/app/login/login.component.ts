import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ReqRes} from "../entity/ReqRes";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {LoginEntity} from "../entity/LoginEntity";
import {FormsModule} from "@angular/forms";
import {User} from "../entity/User";
import {Media} from "../entity/MediaEntity";

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  vorname:any;
  nachname:any;
  benutzername: any;
  email: any;
  passwort: any;
  token: any;
  bild:any;
  ok=false;
constructor(private http: HttpClient,private sanitizer: DomSanitizer) {}

  public signIn(): void {
    const login = new LoginEntity(this.email, this.passwort);
    this.http.post<ReqRes>("http://localhost:8080/api/auth/signin", login)
      .subscribe(
        (response: ReqRes) => {
          this.token=response.token;
          localStorage.setItem("token", response.token);
          console.log('Token:', response.token);
        },
        error => {
          console.error('Fehler bei der Anmeldung:', error);
        }
      );
  }



  public getAllUers(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    // Füge die Header-Optionen zur Anfrage hinzu
    const options = { headers: headers };

    this.http.get<User[]>("http://localhost:8080/api/user/getAll",options)
       .subscribe(
       (response: User[])=>{
            console.log(response);
       }
    );
  }
  public getAllMedia(){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const options = { headers: headers };

    this.http.get<Media[]>("http://localhost:8080/api/media/getAll",options)
       .subscribe(
       (response: Media[])=>{
         this.bild=`data:image/png;base64,${response[0].bild}`;
            console.log(response);
       }
    );
    let ok=true;
  }
}
// ../../assets/Coffee Book Cafe Library Tea Cup Shop Refresh Friend Restaurant Food Logo, Coffee, Book, Cup PNG and Vector with Transparent Background for Free Download.jpeg
