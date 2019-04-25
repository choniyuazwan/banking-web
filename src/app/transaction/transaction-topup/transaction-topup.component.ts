import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/shared/service/transaction.service';
import { DiscardComponent } from 'src/app/discard/discard.component';
import { Transaction } from 'src/app/shared/model/transaction';
import { Customer } from 'src/app/shared/model/customer';
import { TransactionType } from 'src/app/shared/model/transaction-type';
import { Account } from 'src/app/shared/model/account';
import { Wallet } from 'src/app/shared/model/wallet';
import { WalletService } from 'src/app/shared/service/wallet.service';
import { WalletAccountService } from 'src/app/shared/service/wallet-account.service';
import { WalletAccount } from 'src/app/shared/model/wallet-account';

@Component({
  selector: 'app-transaction-topup',
  templateUrl: './transaction-topup.component.html',
  styleUrls: ['./transaction-topup.component.css']
})
export class TransactionTopupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private walletAccountService: WalletAccountService
  ) { }

  get amount() {
    return this.addCusForm.get('amount')
  }

  get accountDebitNumber() {
    return this.addCusForm.get('accountDebitNumber')
  }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;

  ngOnInit() {
    this.walletAccountService.getWalletAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.walletAccounts = response.data;
        }
      }
    );

    this.addCusForm = this.fb.group({
      accountDebitNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]]
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

  public cancelN(): void {
    this.dialog.closeAll();
  }

  walletAccounts: WalletAccount
  customer: Customer = new Customer;
  transactionType: TransactionType = new TransactionType;
  accountDebit: Account = new Account;
  accountCredit: Account = new Account;

  add() {
    let transaction = new Transaction();
    this.customer.cif = localStorage.getItem('cif');
    this.transactionType.code = 1;
    this.accountDebit.accountNumber = this.addCusForm.controls['accountDebitNumber'].value;
    transaction.amount = this.addCusForm.controls['amount'].value;

    transaction.transactionType = this.transactionType;
    transaction.accountDebit = this.accountDebit;
    transaction.customer = this.customer;
    this.transactionService.addTransaction(transaction).subscribe(
      response => {
        if(response.responseCode!=='01'){
          console.log(response);
        }else{
          console.log(response);
        }
      }
    )
  }

}
