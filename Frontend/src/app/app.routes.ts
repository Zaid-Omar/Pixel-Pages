import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { BuchungenComponent } from './buchungen/buchungen.component';
import { FavoritenComponent } from './favoriten/favoriten.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { VerwaltungComponent } from './verwaltung/verwaltung.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
  {
    'path': 'signup', component:SignupComponent
  },
  {
    'path': '', component:HomeComponent
  },
  {
    'path': 'refresh', component:AppComponent
  },
  {
    'path': 'kontakt', component:KontaktComponent
  },
  {
    'path': 'buchungen', component:BuchungenComponent
  },
  {
    'path': 'favoriten', component:FavoritenComponent
  },
  {
    'path': 'login', component:LoginComponent
  },
  {
    'path': 'einstellungen', component:UsersettingsComponent
  },
  {
    'path': 'verwaltung', component:VerwaltungComponent
  }
];
