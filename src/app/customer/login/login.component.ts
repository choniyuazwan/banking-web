import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';

/** @title Simple form field */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      agree: [false, [
        Validators.requiredTrue
      ]]
    })

    this.myForm.valueChanges.subscribe(console.log)
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get agree() {
    return this.myForm.get('agree')
  }

  myForm: FormGroup;

  // email = new FormControl('', [Validators.required, Validators.email]);

  // password = new FormControl('', [Validators.required]);

  // getErrorEmail() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }

  // getErrorPassword() {
  //   return this.password.hasError('required') ? 'You must enter a value' :
  //       this.password.hasError('password') ? 'Not a valid password' :
  //           '';
  // }

  login() {

  }
}

