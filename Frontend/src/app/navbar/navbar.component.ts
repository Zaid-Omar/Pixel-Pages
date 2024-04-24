import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  username: string = 'bisher keine Lösung';

  constructor(private router: Router, private prodser: ApisService) {
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
          case '/kontakt':
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

  ngOnInit() {
      console.log(this.username)
    if (typeof localStorage !== 'undefined') {
      try {
        this.anmeldeboolean = localStorage.getItem('isLoggedIn') === 'true';

      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }

}


}
