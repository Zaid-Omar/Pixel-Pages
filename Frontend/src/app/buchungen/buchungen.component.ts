import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss']
})
export class BuchungenComponent {
  searchTerm: string = "";
  bookings: any[] = [
    {
      title: "Buch 1",
      category: "Romane",
      isbn: "123456789",
      dueDate: "30.04.2024"
    },
    {
      title: "Buch 2",
      category: "Krimis",
      isbn: "987654321",
      dueDate: "15.05.2024"
    },
    {
      title: "Buch 3",
      category: "Science Fiction",
      isbn: "456789123",
      dueDate: "20.05.2024"
    }
  ];

  searchBooks() {
    // Beispiel-Implementierung für die Buchsuche
    if (this.searchTerm.trim() === "") {
      this.bookings = [
        {
          title: "Buch 1",
          category: "Romane",
          isbn: "123456789",
          dueDate: "30.04.2024"
        },
        {
          title: "Buch 2",
          category: "Krimis",
          isbn: "987654321",
          dueDate: "15.05.2024"
        },
        {
          title: "Buch 3",
          category: "Science Fiction",
          isbn: "456789123",
          dueDate: "20.05.2024"
        }
      ];
    } else {
      this.bookings = this.bookings.filter(booking =>
        booking.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.isbn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.dueDate.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  extendBooking(booking: any) {
    // Beispiel-Implementierung für die Buchverlängerung
    console.log("Buchverlängerung für", booking.title);
  }

  returnBook(booking: any) {
    // Beispiel-Implementierung für die Buchrückgabe
    console.log("Buchrückgabe für", booking.title);
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
