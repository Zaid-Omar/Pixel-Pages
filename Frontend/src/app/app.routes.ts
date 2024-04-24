import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { BuchungenComponent } from './buchungen/buchungen.component';
import { FavoritenComponent } from './favoriten/favoriten.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  {
    'path': 'signup', component:SignupComponent
  },
  {
    'path': '', component:HomeComponent
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
  }
];
