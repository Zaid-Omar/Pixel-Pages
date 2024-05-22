import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { ReservierungService } from '../services/reservierung.service';
import { NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-reservierungs-uebersicht',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './reservierungs-uebersicht.component.html',
  styleUrl: './reservierungs-uebersicht.component.scss'
})
export class ReservierungsUebersichtComponent implements OnInit{
  isFormVisible: boolean = false;
  media: FavoriteEntity[] = [];

  constructor(private reservierungService: ReservierungService) {}

  ngOnInit(): void {
    this.getAllFavorits();
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  getAllFavorits(): void {
    this.reservierungService.getAllReservierung().pipe(
      tap((response: FavoriteEntity[] | FavoriteEntity) => {
        if (Array.isArray(response)) {
          this.media = response.sort((a, b) => a.media.id - b.media.id);
        } else {
          this.media = [response];
        }
      }),
      catchError(error => {
        console.error('Fehler beim Abrufen der Favoriten:', error);
        throw error;
      })
    ).subscribe();
  }

  deleteFavorite(media: FavoriteEntity): void {
    const mediaID = media.id;
    console.log(mediaID)
    console.log(media.id)

    this.reservierungService.deleteReservierung(mediaID).subscribe({
      next: () => {
        this.getAllFavorits();
      },
      error: (error) => {
        console.error('Fehler beim Löschen des Favoriten:', error);
      }
    });
  }
}
