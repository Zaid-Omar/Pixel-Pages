import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApisService } from '../services/apis.service';
import { Media } from '../entity/MediaEntity';
import { MediaService } from '../services/media.service';
import { Observable } from 'rxjs';
import { ReservierungService } from '../services/reservierung.service';
import { Reservierung } from '../entity/ReservierungsEntity';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { BuchungService } from '../services/buchung.service';
import { Buchung } from '../entity/BuchungsEntity';
import { response } from 'express';
import { User } from '../entity/UserEntity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = '';
  searchTerm: string = '';
  showConfirmationDialog: boolean = false;
  selectedMedia: any;
  mediaLikes: { [key: number]: boolean } = {};
  media: Media[] = [];
  likedmedia: FavoriteEntity[] = [];
  borrowedMedia: number[] = [];
  reservierung: any;
  filteredMedia: Media[] = [];


  constructor(
    private http: HttpClient,
    private apisService: ApisService,
    private mediaService: MediaService,
    private resService: ReservierungService,
    private BuchungServ: BuchungService
  ) {}

  ngOnInit() {
    this.getAllMedia();
    this.getAllFavorits();
    this.loadBorrowedMedia();
  }

  searchMedia(): void {
    if (!this.searchTerm) {
      this.filteredMedia = [...this.media]; // Show all media if no search term is entered
    } else {
      this.filteredMedia = this.media.filter(mediaItem =>
        (mediaItem.titel?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         mediaItem.isbn?.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }


  showConfirmation(media: Media) {
    const login = localStorage.getItem('isLoggedIn');
    if (login) {
      media.showConfirmation = true;
      this.selectedMedia = media;
    } else {
      console.log('Du musst angemeldet sein!');
    }
  }

  hideConfirmation(media: Media) {
    media.showConfirmation = false;
    this.selectedMedia = null;
  }

  ausleihen(media: Media) {
    const media_id = media.id;
    const user_id = this.getCurrentUserId();
    const mediares: Buchung = {
      user: { id: user_id },
      media: { id: media_id }
    };

    //console.log('Sending reservation:', mediares);
    this.BuchungServ.addBuchung(mediares).subscribe({
      next: (res) => {
        console.log('Buchung erfolgreich:', res);
        let map = new Map();
        map.set(map, media_id);
        console.log(map)
        this.borrowedMedia.push(media_id);
        this.saveBorrowedMedia();
        media.showConfirmation = false;  // Setzen Sie showConfirmation auf false
        this.selectedMedia = null;
      },
      error: (err) => console.error('Fehler bei der Buchung:', err)
    });

    this.showConfirmationDialog = false;
    this.selectedMedia = null;
  }

  like(media: Media) {
    const mediaId = media.id;
    const isCurrentlyLiked = this.isLiked(mediaId);
    const user_id = this.getCurrentUserId();

    if (!isCurrentlyLiked) {
      const reservation: Reservierung = {
        user: { id: user_id },
        media: { id: mediaId }
      };
      this.resService.addReservierung(reservation).subscribe({
        next: (res) => {
          console.log('Reservation successful:', res.media);
          this.mediaLikes[mediaId] = true;
          this.updateLikedMediaArray();
        },
        error: (err) => console.error('Error in reservation:', err)
      });
    } else {
      this.deleteFavorite(mediaId, user_id);
    }
  }

  updateLikedMediaArray() {
    this.getAllFavorits();
  }

  deleteFavorite(mediaId: number, userId: any) {
    this.resService.getByUserReservierung(userId).subscribe(
      (response: any) => {
        const favorite = response.find((f: FavoriteEntity) => f.media.id === mediaId);
        if (favorite) {
          this.resService.deleteReservierung(favorite.id).subscribe(
            success => {
              console.log(`Favorite removed:`);
              this.mediaLikes[mediaId] = false;
              this.updateLikedMediaArray();
            },
            error => console.error('Error removing favorite:', error)
          );
        }
      },
      error => console.error('Error fetching favorites:', error)
    );
  }


  getCurrentUserId(): any {
    const userIdString: string | null = localStorage.getItem('user_id');
    if (userIdString !== null) {
      return parseInt(userIdString, 10);
    } else {
      throw new Error('User ID not found in localStorage');
    }
  }





  getAllMedia(): void {
    this.mediaService.getAllMedia().subscribe(
      (response: Media | Media[]) => {
        this.media = Array.isArray(response) ? response : [response];  // Ensures this.media is always an array
        this.filteredMedia = Array.isArray(response) ? response : [response]; // Ensures this.filteredMedia is always an array
      },
      (error) => {
        console.error('Error fetching media:', error);
      }
    );
  }

  getAllFavorits() {
    const user_id = this.getCurrentUserId();
    this.resService.getByUserReservierung(user_id).subscribe(
      (response: FavoriteEntity | FavoriteEntity[]) => {
        this.likedmedia = Array.isArray(response) ? response : [response];
      },
      (error) => {
        console.error('Fehler beim Abrufen der Medien, FavorieComponent', error);
      }
    );
  }

  isLiked(mediaId: number): boolean {
    return this.likedmedia.some((item) => item.media.id === mediaId);
  }

  isBorrowed(mediaId: number): boolean {
    return this.borrowedMedia.includes(mediaId);
  }

  saveBorrowedMedia() {
    localStorage.setItem('borrowedMedia', JSON.stringify(this.borrowedMedia));
  }

  loadBorrowedMedia() {
    const borrowedMedia1 = localStorage.getItem('borrowedMedia');
    if (borrowedMedia1) {
      this.borrowedMedia = JSON.parse(borrowedMedia1);
    }
  }
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
