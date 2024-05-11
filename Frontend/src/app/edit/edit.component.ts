import { VerwaltungComponent } from '../verwaltung/verwaltung.component';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { BuchungService } from '../services/buchung.service';
import { response } from 'express';
import { error } from 'console';
import { Buchung } from '../entity/BuchungsEntity';
import { Media } from '../entity/MediaEntity';
import { idEntity } from '../entity/idEntity';
import { NgControl, NgForm } from '@angular/forms';
import { ApisService } from '../services/apis.service';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [VerwaltungComponent, NgForOf, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  searchTerm: string = "";
  bookings: Media[] = [];
  isFormVisible: boolean = false;


  constructor(private buchungServ: MediaService) {}

  searchBooks() {}

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  extendBooking(booking: any) {
    console.log("Buchverlängerung für", booking.title);
  }

  returnBook(booking: any) {
    // Beispiel-Implementierung für die Buchrückgabe
    console.log("Buchrückgabe für", booking.title);
  }

  ngOnInit(): void {
    this.getAllBuchungByUser();
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

  getAllBuchungByUser() {
    const user_id = this.getCurrentUserId();
    this.buchungServ.getAllMedia().subscribe(
      (response: Media | Media[]) => {
        this.bookings = Array.isArray(response) ? response : [response]

      }, error => {
        console.error('Fehler beim Abrufen der Bookings, Buchungcomponent', error)
      }
    )
  }

  deleteFavorite(media: Media) {
    const mediaID = media.id;

    // Entferne das Element von deinem Backend
    this.buchungServ.deleteMediaByID(mediaID).subscribe(
      () => {
        console.log("Medienbuchung gelöscht:", mediaID);
      },
      error => console.error('Fehler beim Löschen der Buchung:', error)
    );
    location.reload();
  }
}
