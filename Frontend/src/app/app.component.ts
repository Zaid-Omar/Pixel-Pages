import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pixel Pages';
  refreshOut: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    const shouldNavigate = localStorage.getItem('navigateAfterReload');
    if (shouldNavigate === 'true') {
      // Wenn das Flag gesetzt ist, navigieren wir und löschen das Flag.
      localStorage.removeItem('navigateAfterReload');
      localStorage.removeItem('refresh');
      this.router.navigate(['']);
    } else {
      // Checken, ob ein Neuladen erforderlich ist.
      const shouldRefresh = localStorage.getItem('refresh');
      if (shouldRefresh === 'false') {
        localStorage.setItem('refresh', 'true'); // Oder einen anderen Wert, den Sie nach dem Neuladen verwenden möchten.
        localStorage.setItem('navigateAfterReload', 'true');
        location.reload();
      }
    }
  }

}
