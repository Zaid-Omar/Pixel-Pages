import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeIndex: number = 0;

  constructor(private router: Router) {
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
}
