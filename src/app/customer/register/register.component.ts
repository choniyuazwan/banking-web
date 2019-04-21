import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  // registrationForm = new FormGroup({
  //   email: new FormControl('Azwan'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl('')
  // })

  registrationForm = this.fb.group({
    email: ['Azwan', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  })

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
