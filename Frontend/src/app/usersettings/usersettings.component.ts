import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.scss'
})
export class UsersettingsComponent {
  updateUser: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.updateUser = this.formBuilder.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      benutzername: ['', Validators.required],
      email: ['', Validators.required],
      passwort: ['', Validators.required],
      confrimpasswort:  ['', Validators.required]
    });
  }


}
