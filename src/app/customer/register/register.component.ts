import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
    email: ['Azwan'],
    password: [''],
    confirmPassword: ['']
  })

  register() {

  }

  loadApiData() {
    this.registrationForm.patchValue({
      email: 'Choniyu Azwan',
      password: 'test',
    })
  }
}
