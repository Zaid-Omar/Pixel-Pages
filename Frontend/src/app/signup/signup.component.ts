import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { Component} from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ReqRes } from '../entity/ReqRes';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent{
  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder,private router: Router, private prodser: ApisService) {
    this.registerForm = this.formBuilder.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      benutzername: ['', Validators.required],
      email: ['', Validators.required],
      passwort: ['', Validators.required]
    });
  }

  signUp() {
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
