import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/** @title Simple form field */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  hide = true;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.loginForm.valueChanges.subscribe(console.log)
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get agree() {
    return this.loginForm.get('agree')
  }

  loginForm: FormGroup;

  login() {
    this.router.navigate(['/sidenav'])
  }
}

