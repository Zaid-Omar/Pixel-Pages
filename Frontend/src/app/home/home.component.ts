import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  message = '';
  searchTerm: string = '';
  filteredMedia: any[] = [];
  showConfirmationDialog: boolean = false;
  selectedMedia: any;

  media: any[] = [
    {
      title: 'Die Schöne und das Beast',
      isbn: '1234567890',
      coverUrl: '../../assets/Buch1.jpg',
      type: 'Buch',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'der Grinch',
      isbn: '0987654321',
      coverUrl: '../../assets/Buch2.jpg',
      type: 'Buch',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Wheinachtsmann & Co',
      isbn: '1357924680',
      coverUrl: '../../assets/Buch3.jpg',
      type: 'Buch',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Top Hits 1994',
      isbn: '0987654322',
      coverUrl: '../../assets/CD1.jpg',
      type: 'CD',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Top Hits',
      isbn: '0987654323',
      coverUrl: '../../assets/CD2.jpg',
      type: 'CD',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Mero',
      isbn: '0987654324',
      coverUrl: '../../assets/CD3.jpg',
      type: 'CD',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Der Zwerg',
      isbn: '0987654325',
      coverUrl: '../../assets/Film1.jpg',
      type: 'Film',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Der Hobbit',
      isbn: '0987654326',
      coverUrl: '../../assets/Film2.jpg',
      type: 'Film',
      ausgeliehen: false,
      liked: false
    },
    {
      title: 'Titanic',
      isbn: '0987654327',
      coverUrl: '../../assets/Film3.jpg',
      type: 'Film',
      ausgeliehen: false,
      liked: false
    }
  ];
  constructor(private http: HttpClient, private apisService: ApisService) {
    this.filteredMedia = this.media;
  }

  searchMedia() {
    this.filteredMedia = this.media.filter(item =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.isbn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  showConfirmation(media: any) {
    this.showConfirmationDialog = true;
    this.selectedMedia = media;
  }

  hideConfirmation() {
    this.showConfirmationDialog = false;
    this.selectedMedia = null;
  }

  ausleihen(media: any) {
    media.ausgeliehen = true;
    this.showConfirmationDialog = false;
    this.selectedMedia = null;
  }

  like(media: any) {
    media.liked = !media.liked;
  }

  ngOnInit(): void {
    this.apisService.username$.subscribe(username => {
      if(username) {
        this.message = `Hi, ${username}`;
      }
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
