import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { existEmailValidator } from 'src/app/shared/validator/exist-email';
import { PasswordValidation } from 'src/app/shared/validator/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  registrationForm = this.fb.group({
    email: ['Azwan', [Validators.required, Validators.email, existEmailValidator(/^admin$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, {validator: PasswordValidation.MatchPassword});

  ngOnInit() {}

  get email() {
    return this.registrationForm.get('email')
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
      email: 'Choniyu Azwan',
      password: 'test',
    })
  }
}
