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

  constructor(private http: HttpClient, private apisService: ApisService, private mediaService: MediaService, private resService: ReservierungService) {
  }

  ngOnInit() {
    this.getAllMedia();  // Fetch the media list when the component initializes
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

  ausleihen(media: any) {
    media.ausgeliehen = true;
    this.showConfirmationDialog = false;
    this.selectedMedia = null;
    this.userLeihtAus();
  }

  like(media: Media) {
    this.mediaLikes[media.id] = !this.mediaLikes[media.id];
    if (this.mediaLikes[media.id]) {
      const user_id = this.getCurrentUserId();
      const media_id = media.id;
      const mediares: Reservierung = {
        user: user_id ,
        media: media_id
      };
      console.log('Sending reservation:', mediares);

      this.resService.addReservierung(mediares)
        .subscribe({
          next: (res) => console.log('Reservierung erfolgreich:', res),
          error: (err) => console.error('Fehler bei der Reservierung:', err)
        });
    }
  }

  getCurrentUserId(): string {
    return localStorage.getItem('user_id') || '';
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
}



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
