import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { Component} from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ReqRes } from '../entity/ReqRes';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent{
  isSubmitted = false;
  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder,private router: Router, private prodser: ApisService) {
    this.registerForm = this.formBuilder.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      benutzername: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwort: ['', [Validators.required, Validators.minLength(6)]],
      confirmPasswort: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwort = control.get('passwort');
    const confirmPasswort = control.get('confirmPasswort');
    if (passwort && confirmPasswort && passwort.value !== confirmPasswort.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }


  signUp() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      const offerData: ReqRes = this.registerForm.value;
      this.prodser.signUp(offerData).subscribe(
      (response) => {
        console.log('Benutzer hinzugefügt:', response);
        this.router.navigate(['/login']);

      },
      (error) => {
        console.log('Anzeige war nicht erfolgreich');
      }
      )
    }
  }

  submit() {}
}
