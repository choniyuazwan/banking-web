import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    email: new FormControl('Azwan'),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  register() {

  }

  loadApiData() {
    // this.registrationForm.setValue({
    //   email: 'Choniyu Azwan',
    //   password: 'test',
    //   confirmPassword: 'test'
    // })

    this.registrationForm.patchValue({
      email: 'Choniyu Azwan',
      password: 'test',
    })
  }
}
