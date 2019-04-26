import { Component, OnInit, VERSION, ViewChild, HostListener, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscardComponent } from '../../discard/discard.component';
import { Account } from 'src/app/shared/model/account';
import { AccountService } from 'src/app/shared/service/account.service';
import { Customer } from 'src/app/shared/model/customer';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  today= new Date();
  jstoday = '';
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US'); }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;

  ngOnInit() {
    console.log('add account')
    this.addCusForm = this.fb.group({
      accountName: ['', [Validators.required]],
      balance: ['', [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.add();
    this.cancelN()
    // this.markAsDirty(this.addCusForm);
  }

  openDialog(): void {
    if(this.addCusForm.touched) {
      const dialogRef = this.dialog.open(DiscardComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  get accountName() {
    return this.addCusForm.get('accountName')
  }

  get balance() {
    return this.addCusForm.get('balance')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  customer: Customer = new Customer;

  add() {
    let account = new Account();
    account.accountName = this.addCusForm.controls['accountName'].value;
    account.balance = this.addCusForm.controls['balance'].value;
    this.customer.cif = localStorage.getItem('cif');
    account.customer = this.customer;
    account.openDate = this.jstoday;
    


    this.accountService.addAccount(account).subscribe(
      response => {
        if(response.responseCode!=='01'){
          console.log(response);
        }else{
          // this.router.navigate(['/sidenav/accountlist'])
          console.log(response);
          window.location.reload();
        }
      }
    )
  }
}
