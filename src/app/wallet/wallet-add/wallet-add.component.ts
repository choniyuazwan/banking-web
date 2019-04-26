import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscardComponent } from '../../discard/discard.component';
import { WalletService } from 'src/app/shared/service/wallet.service';
import { Customer } from 'src/app/shared/model/customer';
import { Wallet } from 'src/app/shared/model/wallet';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {
  today= new Date();
  jstoday = '';
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private walletService: WalletService
  ) {this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US')}

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;

  ngOnInit() {
    console.log('add wallet')
    this.addCusForm = this.fb.group({
      description: ['', [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.add();
    this.cancelN()
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

  get description() {
    return this.addCusForm.get('description')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  customer: Customer = new Customer;

  add() {
    let wallet = new Wallet();
    wallet.description = this.addCusForm.controls['description'].value;
    this.customer.cif = localStorage.getItem('cif');
    wallet.customer = this.customer;
    wallet.createdDate = this.jstoday;

    this.walletService.addWallet(wallet).subscribe(
      response => {
        if(response.responseCode!=='01'){
          console.log(response);
        }else{
          console.log(response);
          window.location.reload();
        }
      }
    )
  }
}
