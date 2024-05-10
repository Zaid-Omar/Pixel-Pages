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

@Component({
  selector: 'app-edit-medium',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-medium.component.html',
  styleUrls: ['./edit-medium.component.scss']
})
export class EditMediumComponent implements OnInit {
  message = '';
  searchTerm: string = '';
  filteredMedia: any[] = [];
  showConfirmationDialog: boolean = false;
  selectedMedia: any;
  mediaLikes: { [key: number]: boolean } = {};
  media: Media[] = [];
  likedmedia: FavoriteEntity[] = [];
  borrowedMedia: number[] = []; // Store borrowed media IDs

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
    this.loadBorrowedMedia(); // Load borrowed media from localStorage
  }

  searchMedia() {
    // Implement search functionality here
  }

  showConfirmation(media: any) {
    const login = localStorage.getItem('isLoggedIn');
    if (login) {
      this.showConfirmationDialog = true;
      this.selectedMedia = media;
    } else {
      console.log('Du musst angemeldet sein!');
    }
  }

  hideConfirmation() {
    this.showConfirmationDialog = false;
    this.selectedMedia = null;
  }

  ausleihen(media: Media) {
    const media_id = media.id;
    const user_id = this.getCurrentUserId();
    const mediares: Buchung = {
      user: { id: user_id },
      media: { id: media_id }
    };

    console.log('Sending reservation:', mediares);
    this.BuchungServ.addBuchung(mediares).subscribe({
      next: (res) => {
        console.log('Buchung erfolgreich:', res);
        this.borrowedMedia.push(media_id); // Mark media as borrowed
        this.saveBorrowedMedia(); // Save borrowed media to localStorage
      },
      error: (err) => console.error('Fehler bei der Buchung:', err)
    });

    this.showConfirmationDialog = false;
    this.selectedMedia = null;
  }

  like(media: Media) {
    const isLiked = this.isLiked(media.id);
    this.mediaLikes[media.id] = !this.mediaLikes[media.id];
    if (this.mediaLikes[media.id]) {
      console.log(media.id);
      const user_id = this.getCurrentUserId();
      const media_id = media.id;
      const mediares: Reservierung = {
        user: { id: user_id },
        media: { id: media_id }
      };
      console.log('Sending reservation:', mediares);
      this.resService.addReservierung(mediares).subscribe({
        next: (res) => console.log('Reservierung erfolgreich:', res),
        error: (err) => console.error('Fehler bei der Reservierung:', err)
      });
    } else {
      if (isLiked) {
        this.deleteFavorite(media.id);
      }
    }
  }

  getCurrentUserId(): any {
    const userIdString: string | null = localStorage.getItem('user_id');
    if (userIdString !== null) {
      return parseInt(userIdString, 10);
    } else {
      throw new Error('User ID not found in localStorage');
    }
  }

  deleteFavorite(mediaId: any) {
    this.resService.deleteReservierung(mediaId).subscribe(() => {
      location.reload();
    });
  }

  getAllMedia() {
    this.mediaService.getAllMedia().subscribe(
      (response: Media | Media[]) => {
        this.media = Array.isArray(response) ? response : [response];
      },
      (error) => {
        console.error('Fehler beim Abrufen der Medien:', error);
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
