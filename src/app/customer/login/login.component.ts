import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Login } from 'src/app/shared/model/login';


/** @title Simple form field */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  message;

  hide = true;

  customer: Customer;

  loginForm: FormGroup;

  ngOnInit() {
    localStorage.removeItem('cif')
    if (sessionStorage.getItem('cif')) {
      this.message = `${sessionStorage.getItem('cif')} sudah login`;
    } else {
      this.message = `silahkan login`;
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // this.loginForm.valueChanges.subscribe(console.log)
  }

  login() {
    this.customerService.login(new Login(this.loginForm.get('username').value, this.loginForm.get('password').value)).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.customer = response.data;
          localStorage.setItem('cif', response.data.cif)
          this.router.navigate(['/sidenav'])
        }
      }
    );
  }
}

