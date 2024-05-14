import { Component, NgModule, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApisService } from '../services/apis.service';
import { Media } from '../entity/MediaEntity';
import { MediaService } from '../services/media.service';
import { ReservierungService } from '../services/reservierung.service';
import { Reservierung } from '../entity/ReservierungsEntity';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { BuchungService } from '../services/buchung.service';
import { Buchung } from '../entity/BuchungsEntity';
import { VorschlagService } from '../services/vorschlag.service';

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
  LoginIn: boolean = false;
  isFormVisible: boolean = false;
  form: FormGroup;
  selectedFileName: string | null = null;




  constructor(
    private http: HttpClient,
    private apisService: ApisService,
    private fb: FormBuilder,
    private mediaService: MediaService,
    private resService: ReservierungService,
    private BuchungServ: BuchungService,
    private VorschlagServ: VorschlagService
  ) { this.form = this.fb.group({
    autor: ['', Validators.required],
    titel: ['', Validators.required],
    typ: ['', Validators.required],
    isbn: ['', Validators.required],
    bild: [null, Validators.required],
  });}

  ngOnInit() {
    this.getAllMedia();
    this.getAllFavorits();
    this.loadBorrowedMedia();
    this.isLoggedIn();
  }

  searchMedia(): void {
    if (!this.searchTerm) {
      this.filteredMedia = [...this.media];
    } else {
      this.filteredMedia = this.media.filter(mediaItem =>
        (mediaItem.titel?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         mediaItem.isbn?.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  isLoggedIn() {
    const login = localStorage.getItem('isLoggedIn');
    if (login) {
      this.LoginIn = true
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

    this.BuchungServ.addBuchung(mediares).subscribe({
      next: (res) => {
        console.log('Buchung erfolgreich:', res);
        let map = new Map();
        map.set(map, media_id);
        console.log(map)
        this.borrowedMedia.push(media_id);
        this.saveBorrowedMedia();
        media.showConfirmation = false;
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
    if (typeof window !== 'undefined' && window.localStorage) {
      const userIdString: string | null = localStorage.getItem('user_id');
      if (userIdString !== null) {
        return parseInt(userIdString, 10);
      } else {
        throw new Error('User ID not found in localStorage');
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  getAllMedia(): void {
    this.mediaService.getAllMedia().subscribe(
      (response: Media | Media[]) => {
        this.media = Array.isArray(response) ? response : [response];
        this.filteredMedia = Array.isArray(response) ? response : [response];
      },
      (error) => {
        console.error('Error fetching media:', error);
      }
    );
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
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
    if (typeof window !== 'undefined' && window.localStorage) {
      const borrowedMedia1 = localStorage.getItem('borrowedMedia');
      if (borrowedMedia1) {
        this.borrowedMedia = JSON.parse(borrowedMedia1);
      } else {
        console.log('No borrowed media data found in localStorage.');
        this.borrowedMedia = [];
      }
    } else {
      console.error('localStorage is not available');
      this.borrowedMedia = [];
    }}
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.fileToBase64(file).then(
        base64 => this.form.patchValue({ bild: base64 }),
        error => console.error('Error during image file conversion:', error)
      );
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  submit(): void {
    if (this.form.valid) {
      const newVorschlag: Media = {
        ...this.form.value,
        id: null,
        status: true
      };
      this.VorschlagServ.addMedia(newVorschlag).subscribe({
        next: res => {
          console.log('Media added successfully:', res);
          this.form.reset();
          this.selectedFileName = null;
          this.isFormVisible = false;
          this.getAllMedia();  // Refresh the list of media
        },
        error: err => console.error('Error adding media:', err)
      });
    } else {
      console.error('Form is not valid');
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
