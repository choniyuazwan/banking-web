import { Component, OnInit } from '@angular/core';
import { Wallet } from '../shared/model/wallet';
import { WalletAccount } from '../shared/model/wallet-account';
import { Transaction } from '../shared/model/transaction';
import { AccountService } from '../shared/service/account.service';
import { WalletService } from '../shared/service/wallet.service';
import { Account } from 'src/app/shared/model/account';
import { WalletAccountService } from '../shared/service/wallet-account.service';
import { TransactionService } from '../shared/service/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  accounts:Account;
  wallets:Wallet;
  walletAccounts:WalletAccount;
  transactions: Transaction[];

  arrayAccounts;
  arrayWallets;
  arrayWalletAccounts;

  lengthAccount=0;
  lengthWallet=0
  lengthWalletAccount=0
  lengthTransaction=0
  
  constructor(private accountService: AccountService, private walletService:WalletService, private walletAccountService:WalletAccountService, private transactionService:TransactionService) { }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 4; // Breakpoint observer code

    this.breakpoint = 4;
    if(window.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if(window.innerWidth <= 900) {
      this.breakpoint = 2;
    }

    this.accountService.getAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          // alert(JSON.stringify(response.data))
          this.accounts = response.data;
        }

        this.arrayAccounts = Object.keys(this.accounts).map(i => this.accounts[i])

        for (let i = 0; i < this.arrayAccounts.length; i++) {
          this.lengthAccount++;
        }
      }
    );


    this.walletService.getWallets(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.wallets = response.data;
        }

        this.arrayWallets = Object.keys(this.wallets).map(i => this.wallets[i])

        for (let i = 0; i < this.arrayWallets.length; i++) {
          this.lengthWallet++;
        }
      }
    );
    
    this.walletAccountService.getWalletAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.walletAccounts = response.data;
        }

        this.arrayWalletAccounts = Object.keys(this.walletAccounts).map(i => this.walletAccounts[i])

        for (let i = 0; i < this.arrayWalletAccounts.length; i++) {
          this.lengthWalletAccount++;
        }
      }
    );



    this.transactionService.getTransactions(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.transactions = response.data;
        }

        for (let i = 0; i < this.transactions.length; i++) {
          this.lengthTransaction++;
        }
      }
    );
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = 4;
    if(event.target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if(event.target.innerWidth <= 900) {
      this.breakpoint = 2;
    }

    // this.breakpoint = event.target.innerWidth <= 600 ? 1 : 4;
  }
}
