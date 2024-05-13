import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddMediumComponent } from '../add-medium/add-medium.component';
import { EditComponent } from '../edit/edit.component';
import { MitgliederComponent } from '../mitglieder/mitglieder.component';
import { ReservierungsUebersichtComponent } from '../reservierungs-uebersicht/reservierungs-uebersicht.component';

@Component({
  selector: 'app-verwaltung',
  standalone: true,
  imports: [AddMediumComponent, VerwaltungComponent, EditComponent, MitgliederComponent, ReservierungsUebersichtComponent],
  templateUrl: './verwaltung.component.html',
  styleUrl: './verwaltung.component.scss'
})
export class VerwaltungComponent {

}
