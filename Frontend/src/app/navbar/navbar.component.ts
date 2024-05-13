import {Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  activeIndex: number = 0;
  anmeldeboolean: boolean = false;
  username: string = '';
  isAdmin: boolean = false;
  proder: string = "";
  refresh: boolean = false;


  constructor(private router: Router, private prodser: ApisService, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/':
            this.activeIndex = 0;
            break;
          case '/buchungen':
            this.activeIndex = 1;
            break;
          case '/favoriten':
            this.activeIndex = 2;
            break;
          case '/verwaltung':
            this.activeIndex = 3;
            break;
          case '/login':
            this.activeIndex = -1;
            break;
          case '/signup':
            this.activeIndex = -1;
            break;
          default:
            this.activeIndex = 0;
            break;
        }
      }
    });
  }

  resetActiveIndex() {
    this.activeIndex = -1;
  }

  abmelden() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_id');
    localStorage.removeItem('borrowedMedia');
    localStorage.removeItem('token');
    localStorage.setItem('refresh', this.refresh.toString());
    this.router.navigate(['/refresh']);
  }

  ngOnInit() {
    console.log("navbar sitnkt")
    if (typeof localStorage !== 'undefined') {
      const currentUserDataString = localStorage.getItem('currentUser');
      if (currentUserDataString) {
        const currentUserData = JSON.parse(currentUserDataString);
        this.username = currentUserData.benutzername;
        const token = currentUserData.token
        const hasAdminRole = currentUserData.authorities.some((authority: { authority: string }) => authority.authority === 'ROLE_ADMIN');
        this.isAdmin = hasAdminRole;
      } else {
        console.log('Der currentUser-Schlüssel wurde im localStorage nicht gefunden.');
        this.isAdmin = false;
      }

      const login = localStorage.getItem('isLoggedIn');
      this.anmeldeboolean = login ? true : false;
    } else {
      console.log('Local storage is not available.');
    }
  }




}
