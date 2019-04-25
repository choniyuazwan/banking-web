import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/shared/service/transaction.service';
import { WalletAccountService } from 'src/app/shared/service/wallet-account.service';
import { DiscardComponent } from 'src/app/discard/discard.component';
import { WalletAccount } from 'src/app/shared/model/wallet-account';
import { Customer } from 'src/app/shared/model/customer';
import { TransactionType } from 'src/app/shared/model/transaction-type';
import { Account } from 'src/app/shared/model/account';
import { Transaction } from 'src/app/shared/model/transaction';

@Component({
  selector: 'app-transaction-transfer',
  templateUrl: './transaction-transfer.component.html',
  styleUrls: ['./transaction-transfer.component.css']
})
export class TransactionTransferComponent implements OnInit {

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

  get accountCreditNumber() {
    return this.addCusForm.get('accountCreditNumber')
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

    console.log('add transaction')
    this.addCusForm = this.fb.group({
      accountDebitNumber: ['', [Validators.required]],
      accountCreditNumber: ['', [Validators.required]],
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
    this.transactionType.code = 2;
    this.accountDebit.accountNumber = this.addCusForm.controls['accountDebitNumber'].value;
    this.accountCredit.accountNumber = this.addCusForm.controls['accountCreditNumber'].value;
    transaction.amount = this.addCusForm.controls['amount'].value;

    transaction.transactionType = this.transactionType;
    transaction.accountDebit = this.accountDebit;
    transaction.accountCredit = this.accountCredit;
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
