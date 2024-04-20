import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchTerm: string = '';
  books: any[] = [
    {
      title: 'Buch 1',
      isbn: '1234567890',
      coverUrl: 'buchcover1.jpg'
    },
    {
      title: 'Buch 2',
      isbn: '0987654321',
      coverUrl: 'buchcover2.jpg'
    },
    {
      title: 'Buch 3',
      isbn: '1357924680',
      coverUrl: 'buchcover3.jpg'
    },
    {
      title: 'Buch 1',
      isbn: '1234567890',
      coverUrl: 'buchcover1.jpg'
    },
    {
      title: 'Buch 2',
      isbn: '0987654321',
      coverUrl: 'buchcover2.jpg'
    },
    {
      title: 'Buch 3',
      isbn: '1357924680',
      coverUrl: 'buchcover3.jpg'
    },
    {
      title: 'Buch 1',
      isbn: '1234567890',
      coverUrl: 'buchcover1.jpg'
    },
    {
      title: 'Buch 2',
      isbn: '0987654321',
      coverUrl: 'buchcover2.jpg'
    },
    {
      title: 'Buch 3',
      isbn: '1357924680',
      coverUrl: 'buchcover3.jpg'
    },
  ];
  filteredBooks: any[] = [];

  constructor() {
    this.filteredBooks = this.books;
  }

  searchBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(this.searchTerm.toLowerCase())
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
