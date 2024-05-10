import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddMediumComponent } from '../add-medium/add-medium.component';

@Component({
  selector: 'app-verwaltung',
  standalone: true,
  imports: [AddMediumComponent, VerwaltungComponent],
  templateUrl: './verwaltung.component.html',
  styleUrl: './verwaltung.component.scss'
})
export class VerwaltungComponent {

}
