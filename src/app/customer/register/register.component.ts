import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { existEmailValidator } from 'src/app/shared/validator/exist-email';
import { PasswordValidation } from 'src/app/shared/validator/password-validator';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,  private route: ActivatedRoute, private router: Router, private customerService: CustomerService, private snackBar: MatSnackBar, private elementRef:ElementRef) { }
  registerForm: FormGroup;

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =  '#3395e0';
  }

  hide = true;
  hide2 = true;

  checkCustomer = new Customer();

  ngOnInit() {
    // this.customerService.getCustomer(this.username).subscribe(
    //   response => {
    //     if(response.responseCode!=='01'){
    //       alert("username sudah ada");
    //     }else{
    //       this.checkCustomer = response.data;
    //     }
    //   }
    // )

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

  openSnackBar(message: string, success?: boolean) {
    let config = new MatSnackBarConfig();
    // config.verticalPosition = 'bottom';
    // config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = success ? undefined : ['failed'];
    this.snackBar.open(message, success ? undefined : 'Retry', config);
  }

  register() {
    let customer = new Customer();
    customer.firstname = this.registerForm.controls['firstname'].value;
    customer.lastname = this.registerForm.controls['lastname'].value;
    customer.birthdate = this.registerForm.controls['birthdate'].value;
    customer.username = this.registerForm.controls['username'].value;
    customer.password = this.registerForm.controls['password'].value;

    this.customerService.register(customer).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.openSnackBar(response.responseMessage);
        }else{
          this.openSnackBar("Register success", true);
          this.router.navigate(['/login'])
        }
      }
    )
  }
}
