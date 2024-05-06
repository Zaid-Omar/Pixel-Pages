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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = '';
  searchTerm: string = '';
  filteredMedia: any[] = [];
  showConfirmationDialog: boolean = false;
  selectedMedia: any;
  mediaLikes: { [key: number]: boolean } = {};
  media: Media[] = [];
  likedmedia : FavoriteEntity[] = [];

  constructor(private http: HttpClient, private apisService: ApisService, private mediaService: MediaService, private resService: ReservierungService, private BuchungServ: BuchungService) {
  }

  ngOnInit() {
    this.getAllMedia();
    this.getAllFavorits();
  }

  searchMedia() {
    // Add logic here to filter media based on searchTerm
  }

  showConfirmation(media: any) {
    const login = localStorage.getItem('isLoggedIn');
    if (login) {
      this.showConfirmationDialog = true;
      this.selectedMedia = media;
    } else {
      console.log("Du musst angemeldet sein!");
    }
  }

  hideConfirmation() {
    this.showConfirmationDialog = false;
    this.selectedMedia = null;
  }

  ausleihen(media: Media) {
    const media_id = media.id
    const user_id = this.getCurrentUserId();
    const mediares: Buchung = {
          user: { id: user_id },
          media: { id: media_id }
        };
    console.log('Sending reservation:', mediares);
    this.BuchungServ.addBuchung(mediares).subscribe({
      next: (res) => console.log('Buchung erfolgreich:', res),
      error: (err) => console.error('Fehler bei der Buchung:', err)
    })
    // media.ausgeliehen = true;
    // this.showConfirmationDialog = false;
    // this.selectedMedia = null;
    // this.userLeihtAus();
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
         this.resService.addReservierung(mediares)
             .subscribe({
                 next: (res) => console.log('Reservierung erfolgreich:', res),
                 error: (err) => console.error('Fehler bei der Reservierung:', err)
             });
     } else {
         if (isLiked) {
           console.log("was passiert hiet")
             this.deleteFavorite(media.id)
         }
     }
   }

  getCurrentUserId(): any {
    if (typeof localStorage !== 'undefined') {
      const userIdString: string | null = localStorage.getItem('user_id');
      if (userIdString !== null) {
        const userId: number = parseInt(userIdString, 10);
        return userId;
      } else {
        throw new Error("User ID not found in localStorage");
      }
    }
  }

  deleteFavorite(media :FavoriteEntity) {
    const mediaID = media.id
    console.log(media.id)
    this.resService.deleteReservierung(mediaID).subscribe(
    )
    location.reload()
  }

  userLeihtAus() {
    const userId = localStorage.getItem('user_id');
    const currentUser = localStorage.getItem('currentUser');
    console.log('User ID aus dem localStorage:', userId);
  }

  getAllMedia() {
    this.mediaService.getAllMedia().subscribe(
      (response: Media | Media[]) => {
        if (Array.isArray(response)) {
          this.media = response;
        } else {
          this.media = [response];
        }
      },
      error => {
        console.error('Fehler beim Abrufen der Medien:', error);
      }
    );
  }

  getAllFavorits() {
    const user_id = this.getCurrentUserId();
    this.resService.getByUserReservierung(user_id).subscribe(
      (response: FavoriteEntity | FavoriteEntity[]) => {
        if (Array.isArray(response)) {
          this.likedmedia = response;
        } else {
          this.likedmedia = [response];
        }
      }, error => {
        console.error('Fehler beim Abrufen der Medien, FavorieComponent', error)
      }
    );
  }

  isLiked(mediaId: number): boolean {
    return this.likedmedia.some(item => item.media_id?.id === mediaId);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
