import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { ReservierungService } from '../services/reservierung.service';
import { NgForOf, NgIf } from '@angular/common';
import { ApisService } from '../services/apis.service';
import { User } from '../entity/UserEntity';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mitglieder',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './mitglieder.component.html',
  styleUrls: ['./mitglieder.component.scss']
})
export class MitgliederComponent implements OnInit {
  isFormVisible: boolean = false;
  user: User[] = [];

  constructor(private userService: ApisService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  getAllUsers(): void {
    this.userService.getAllUser().subscribe(
      (response: User | User[]) => {
        if (Array.isArray(response)) {
          this.user = response;
        } else {
          this.user = [response];
        }
      }, error => {
        console.error('Fehler beim Abrufen der Bookings, Buchungcomponent', error)
      }
    )
  }

  deleteUser(user: User): void {
    console.log(user.id);
    const userID = user.id;
    console.log(userID)
    this.userService.deleteUserByID(userID).subscribe({
      error: (error) => {
        console.error('Fehler beim Löschen des Benutzers:', error);
      }
    });
  }

  toggleEdit(user: User): void {
    user.isEditing = !user.isEditing;
  }

  updateUser(user: User): void {
    console.log(user)
    this.userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        console.log('User updated:', updatedUser);
        user.isEditing = false;
      },
      error: (error) => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      }
    });
  }
}
