import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { BuchungService } from '../services/buchung.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss']
})
export class BuchungenComponent implements OnInit{

  searchTerm: string = "";
  bookings: FavoriteEntity[] = [];

  constructor(private buchungServ: BuchungService) {}

  searchBooks() {}

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
    this.buchungServ.getByUserBuchung(user_id).subscribe(
      (response: FavoriteEntity | FavoriteEntity[]) => {
        if (Array.isArray(response)) {
          this.bookings = response;
        } else {
          this.bookings = [response];
        }
      }, error => {
        console.error('Fehler beim Abrufen der Bookings, Buchungcomponent', error)
      }
    )
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
