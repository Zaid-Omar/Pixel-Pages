import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { BuchungService } from '../services/buchung.service';
import { response } from 'express';
import { error } from 'console';
import { Buchung } from '../entity/BuchungsEntity';
import { Media } from '../entity/MediaEntity';
import { idEntity } from '../entity/idEntity';
import {BuchungsAnzeige} from "../entity/BuchungsAnzeigeEntity";
import { switchMap} from "rxjs";


@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss']
})
export class BuchungenComponent implements OnInit{

  searchTerm: string = "";
  bookings: BuchungsAnzeige[] = [];


  constructor(private buchungServ: BuchungService) {}

  getAllBuchungByUser() {
    const user_id = this.getCurrentUserId();
    this.buchungServ.getByUserBuchung(user_id).subscribe(
      (response: BuchungsAnzeige | BuchungsAnzeige[]) => {
        if (Array.isArray(response)) {
          this.bookings = response;
        } else {
          this.bookings = [response];
        }

      }, error => {
        console.error('Fehler beim Abrufen der Bookings, Buchungcomponent', error)
      }
    )}

  searchBooks() {
    if (!this.searchTerm) {
      this.getAllBuchungByUser();
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.bookings = this.bookings.filter(booking =>
        booking.media.titel.toLowerCase().includes(searchTermLower) ||
        booking.user.id.toString().includes(searchTermLower)
      );
    }
  }

  extendBooking(booking: any) {
    console.log("Buchverlängerung für", booking.title);
  }

  returnBook(booking: any) {
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

  deleteFavorite(media: FavoriteEntity) {
    const mediaID = media.id;
    const deleteID = media.media.id
    this.buchungServ.deleteBuchung(mediaID).subscribe(
      () => {
        console.log("Medienbuchung gelöscht:", mediaID);
        const borrowedMediaJSON = localStorage.getItem('borrowedMedia');
        if (borrowedMediaJSON) {
          const borrowedMediaArray: number[] = JSON.parse(borrowedMediaJSON);
          const index = borrowedMediaArray.indexOf(deleteID);
          if (index > -1) {
            borrowedMediaArray.splice(index, 1);
            localStorage.setItem('borrowedMedia', JSON.stringify(borrowedMediaArray));
            console.log("Local Storage updated:", borrowedMediaArray);
          }
        }
      },
      error => console.error('Fehler beim Löschen der Buchung:', error)
    );
    location.reload();
  }

  ausleihen(media: Media) {
    const media_id = media.id
    const user_id = this.getCurrentUserId();
    const mediares: Buchung = {
          user: { id: user_id },
          media: { id: media_id }
        };
    console.log('Sending reservation:', mediares);
    this.buchungServ.addBuchung(mediares).subscribe({
      next: (res) => console.log('Buchung erfolgreich:', res),
      error: (err) => console.error('Fehler bei der Buchung:', err)
    })}

  verlaengerMedium(media: FavoriteEntity) {
    const media_id = media.id
    const user_id = this.getCurrentUserId();
    const mediares: Buchung = {
      user: { id: user_id },
      media: { id: media_id }
    };
    this.buchungServ.deleteBuchung(media_id).subscribe({
      next: (res) => console.log('Buchung verlängert(gelöscht):', res),
      error: (err) => console.error('Fehler bei der Verlängerung(löschen):', err)
    })
  }
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [BuchungenComponent]
})
export class HomeModule {}
