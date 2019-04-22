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
  registerForm: FormGroup;

  hide = true;
  hide2 = true;

  ngOnInit() {
    this.registerForm = this.fb.group({
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
    return this.registerForm.get('firstname')
  }

  get lastname() {
    return this.registerForm.get('lastname')
  }

  get birthdate() {
    return this.registerForm.get('birthdate')
  }

  get username() {
    return this.registerForm.get('username')
  }

  get agree() {
    return this.registerForm.get('agree')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  register() {
    const username = this.registerForm
  }
}
