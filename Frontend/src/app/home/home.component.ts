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
  media: any[] = [
    {
      title: 'Die Schöne und das Beast',
      isbn: '1234567890',
      coverUrl: '../../assets/Buch1.jpg',
      type: 'Buch'
    },
    {
      title: 'der Grinch',
      isbn: '0987654321',
      coverUrl: '../../assets/Buch2.jpg',
      type: 'Buch'
    },
    {
      title: 'Wheinachtsmann & Co',
      isbn: '1357924680',
      coverUrl: '../../assets/Buch3.jpg',
      type: 'Buch'
    },
    {
      title: 'Top Hits 1994',
      isbn: '0987654322',
      coverUrl: '../../assets/CD1.jpg',
      type: 'CD'
    },
    {
      title: 'Top Hits',
      isbn: '0987654323',
      coverUrl: '../../assets/CD2.jpg',
      type: 'CD'
    },
    {
      title: 'Mero',
      isbn: '0987654324',
      coverUrl: '../../assets/CD3.jpg',
      type: 'CD'
    },
    {
      title: 'Der Zwerg',
      isbn: '0987654325',
      coverUrl: '../../assets/Film1.jpg',
      type: 'Film'
    },
    {
      title: 'Der Hobbit',
      isbn: '0987654326',
      coverUrl: '../../assets/Film2.jpg',
      type: 'Film'
    },
    {
      title: 'Titanic',
      isbn: '0987654327',
      coverUrl: '../../assets/Film3.jpg',
      type: 'Film'
    }
  ];
  filteredMedia: any[] = [];

  constructor() {
    this.filteredMedia = this.media;
  }

  searchMedia() {
    this.filteredMedia = this.media.filter(item =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.isbn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
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
