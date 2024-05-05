import { Component, OnInit } from '@angular/core';
import { ReqRes } from '../entity/ReqRes';
import { RecordWithTtl } from 'dns';
import { ReservierungService } from '../services/reservierung.service';
import { resolve } from 'path';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { CommonModule } from '@angular/common';
import test from 'node:test';

@Component({
  selector: 'app-favoriten',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoriten.component.html',
  styleUrl: './favoriten.component.scss'
})
export class FavoritenComponent implements OnInit{
  media: FavoriteEntity[] = [];



  constructor(private favoritService: ReservierungService) {}

  ngOnInit(): void {
    this.getAllFavorits();
  }

  getCurrentUserId(): any {
    if (typeof localStorage !== 'undefined') {
      const userIdString: string | null = localStorage.getItem('user_id');
    if (userIdString !== null) {
      const userId: number = parseInt(userIdString, 10);
      return userId;
    } else {
      throw new Error("User ID not found in localStorage");
    }}}

  getAllFavorits() {
    const user_id = this.getCurrentUserId();
    this.favoritService.getByUserReservierung(user_id).subscribe(
      (response: FavoriteEntity | FavoriteEntity[]) => {
        if (Array.isArray(response)) {
          this.media = response;
        } else {
          this.media = [response];
        }
      }, error => {
        console.error('Fehler beim Abrufen der Medien, FavorieComponent', error)
      }
    )
  }


  deleteFavorite(media :FavoriteEntity) {
    const mediaID = media.id
    console.log(media.id)
    this.favoritService.deleteReservierung(mediaID).subscribe(
    )
    location.reload()
  }

}

