import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { existEmailValidator } from 'src/app/shared/validator/exist-email';
import { PasswordValidation } from 'src/app/shared/validator/password-validator';
import { RegistrationService } from 'src/app/shared/service/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) { }
  registrationForm: FormGroup;

  hide = true;
  hide2 = true;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email, existEmailValidator(/^admin$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    }, {validator: PasswordValidation.MatchPassword});
  }

  get firstname() {
    return this.registrationForm.get('firstname')
  }

  get lastname() {
    return this.registrationForm.get('lastname')
  }

  get birthdate() {
    return this.registrationForm.get('birthdate')
  }

  get username() {
    return this.registrationForm.get('username')
  }

  get agree() {
    return this.registrationForm.get('agree')
  }

  get password() {
    return this.registrationForm.get('password')
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')
  }

  register() {

  }

  loadApiData() {
    this.registrationForm.patchValue({
      username: 'Choniyu Azwan',
      password: 'test',
    })
  }

  onSubmit() {
    console.log(this.registrationForm.value)
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('success', response),
        error => console.log('error', error)
      );
  }
}
