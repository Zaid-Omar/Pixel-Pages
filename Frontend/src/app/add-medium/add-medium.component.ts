import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MediaService } from '../services/media.service';
import { Media } from '../entity/MediaEntity';
import { CommonModule } from '@angular/common';
import { FavoriteEntity } from '../entity/FavoriteEntity';
import { BuchungService } from '../services/buchung.service';
import { VerwaltungComponent } from '../verwaltung/verwaltung.component';

@Component({
  selector: 'app-add-medium',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, VerwaltungComponent],
  templateUrl: './add-medium.component.html',
  styleUrls: ['./add-medium.component.scss']
})

export class AddMediumComponent {
  form: FormGroup;
  imageBase64: string | null = null;
  selectedFileName: string | null = null;
  isFormVisible: boolean = false;
  isTableVisible: boolean = false;
  searchTerm: string = '';
  bookings: FavoriteEntity[] = [];
  submitted = false;

  constructor(private fb: FormBuilder, private mediaServ: MediaService, private buchungServ: BuchungService) {
    this.form = this.fb.group({
      autor: ['', Validators.required],
      titel: ['', Validators.required],
      typ: ['', Validators.required],
      isbn: ['', [Validators.required, this.isbnValidator]],
      status: [true, Validators.required],
      bild: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllBuchungByUser();
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  toggleTableVisibility(): void {
    this.isTableVisible = !this.isTableVisible;
  }

  async onImageChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      try {
        this.imageBase64 = await this.base64EncodeImage(file);
        this.form.patchValue({ bild: this.imageBase64 });
      } catch (error) {
        console.error('Error encoding image:', error);
      }
    }
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

  submit(): void {
    this.submitted = true;
    if (this.form.valid) {
      const { autor, titel, typ, isbn, status, bild } = this.form.value;
      const newMedia = new Media(
        null,
        titel,
        autor,
        typ,
        status,
        bild,
        isbn
      );
      this.mediaServ.addMedia(newMedia).subscribe(
        (res) => {
          console.log('Media added successfully:', res);
          this.form.reset({ autor: '', titel: '', typ: '', isbn: '', status: true, bild: null });
          this.selectedFileName = null;
          this.imageBase64 = null;
          this.isFormVisible = false;
          this.submitted = false;
        },
        (err) => {
          console.error('Error adding media:', err);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  getAllBuchungByUser(): void {
    this.buchungServ.getAllBuchung().subscribe(
      (response: FavoriteEntity | FavoriteEntity[]) => {
        if (Array.isArray(response)) {
          this.bookings = response;
        } else {
          this.bookings = [response];
        }
      },
      (error) => {
        console.error('Fehler beim Abrufen der Bookings', error);
      }
    );
  }

  deleteFavorite(media: FavoriteEntity): void {
    const mediaID = media.id;
    this.buchungServ.deleteBuchung(mediaID).subscribe(
      () => {
        this.bookings = this.bookings.filter((booking) => booking.id !== mediaID);
      },
      (error) => {
        console.error('Fehler beim Löschen', error);
      }
    );
  }

  isbnValidator(control: AbstractControl): ValidationErrors | null {
    const isbn = control.value;
    if (!isbn) {
      return { required: true };
    }
    const isbnRegex = /^[0-9]{13}$/;
    if (!isbnRegex.test(isbn)) {
      return { invalidIsbn: true };
    }
    return null;
  }

  get f() { return this.form.controls; }
}
