import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApisService } from '../services/apis.service';
import { Media } from '../entity/MediaEntity';
import { MediaService } from '../services/media.service';

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
  media: Media[] = [];

  constructor(private http: HttpClient, private apisService: ApisService, private mediaService: MediaService) {
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

  like(media: any) {
    media.liked = !media.liked;
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
  base64EncodeImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
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
