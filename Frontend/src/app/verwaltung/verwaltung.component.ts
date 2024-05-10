import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediaService } from '../services/media.service';
import { Media } from '../entity/MediaEntity';
import { ReqRes } from '../entity/ReqRes';

@Component({
  selector: 'app-verwaltung',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verwaltung.component.html',
  styleUrls: ['./verwaltung.component.scss']
})
export class VerwaltungComponent implements OnInit {
  form: FormGroup;
  imageBase64: string | null = null;

  constructor(private fb: FormBuilder, private mediaServ: MediaService) {
    this.form = this.fb.group({
      autor: ['', Validators.required],
      titel: ['', Validators.required],
      typ: ['', Validators.required],
      isbn: ['', Validators.required],
      status: [true, Validators.required],
      bild: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  async onImageChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
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
        },
        (err) => {
          console.error('Error adding media:', err);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}
