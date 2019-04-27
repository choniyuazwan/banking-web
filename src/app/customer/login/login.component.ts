import { Component, OnInit, ElementRef } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Login } from 'src/app/shared/model/login';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


/** @title Simple form field */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  openSnackBar(message: string, success?: boolean) {
    let config = new MatSnackBarConfig();
    // config.verticalPosition = 'bottom';
    // config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = success ? undefined : ['failed'];
    this.snackBar.open(message, success ? undefined : 'Retry', config);
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private customerService: CustomerService, private snackBar: MatSnackBar, private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =  '#3395e0';
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  hide = true;
  customer: Customer;
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.customerService.login(new Login(this.loginForm.get('username').value, this.loginForm.get('password').value)).subscribe(
      response => {
        if (response.responseCode !== '01') {
          this.openSnackBar("Invalid username or password");
        } else {
          this.customer = response.data;
          localStorage.setItem('cif', response.data.cif)
          this.router.navigate(['/dashboard'])
          this.openSnackBar("Login success", true);
        }
      }
    );
  }
}

