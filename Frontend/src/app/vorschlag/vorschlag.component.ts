import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { ReservierungService } from '../services/reservierung.service';
import { NgForOf, NgIf } from '@angular/common';
import { ApisService } from '../services/apis.service';
import { User } from '../entity/UserEntity';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { VorschlagService } from '../services/vorschlag.service';
import { Vorschlag } from '../entity/VorschlagEntity';
import { VorschlagBekommen } from '../entity/VorschlagBekommenEntity';

@Component({
  selector: 'app-vorschlag',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './vorschlag.component.html',
  styleUrl: './vorschlag.component.scss'
})
export class VorschlagComponent {
  isFormVisible: boolean = false;
  vorschlag: Vorschlag[] = [];


  constructor(private vorschlagServ: VorschlagService) {}

  ngOnInit(): void {
    this.getAllVoeschlaege();
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  getAllVoeschlaege(): void {
    this.vorschlagServ.getAllMedia().subscribe(
      (response: VorschlagBekommen | VorschlagBekommen[]) => {
        if (Array.isArray(response)) {
          this.vorschlag = response;
        } else {
          this.vorschlag = [response];
        }
      }, error => {
        console.error('Fehler beim Abrufen der Bookings, Buchungcomponent', error)
      }
    )
  }
}
