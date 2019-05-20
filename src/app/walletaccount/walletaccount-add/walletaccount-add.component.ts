import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscardComponent } from 'src/app/discard/discard.component';
import { WalletAccountService } from 'src/app/shared/service/wallet-account.service';
import { WalletAccount } from 'src/app/shared/model/wallet-account';
import { AccountService } from 'src/app/shared/service/account.service';
import { Account } from 'src/app/shared/model/account';
import { Customer } from 'src/app/shared/model/customer';
import { Wallet } from 'src/app/shared/model/wallet';
import { WalletService } from 'src/app/shared/service/wallet.service';
import { UtilService } from 'src/app/shared/util/util.service';


@Component({
  selector: 'app-walletaccount-add',
  templateUrl: './walletaccount-add.component.html',
  styleUrls: ['./walletaccount-add.component.css']
})
export class WalletaccountAddComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private walletAccountService: WalletAccountService,
    private walletService: WalletService,
    private accountService: AccountService,
    private utilService:UtilService
  ) { }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;

  wallets: Wallet;
  accounts: Account;

  ngOnInit() {
    this.walletService.getWallets(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.wallets = response.data;
        }
      }
    );

    this.accountService.getAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.accounts = response.data;
        }
      }
    );

    this.addCusForm = this.fb.group({
      wallet: ['', [Validators.required]],
      account: ['', [Validators.required]],
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

  get wallet() {
    return this.addCusForm.get('wallet')
  }

  get account() {
    return this.addCusForm.get('account')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  customer: Customer = new Customer;
  walletEntity: Wallet = new Wallet;
  accountEntity: Account = new Account;

  add() {
    let walletAccount = new WalletAccount();
    this.walletEntity.id = this.addCusForm.controls['wallet'].value.toString();
    this.accountEntity.accountNumber = this.addCusForm.controls['account'].value.toString();
    this.customer.cif = localStorage.getItem('cif');
    walletAccount.wallet = this.walletEntity;
    walletAccount.account = this.accountEntity;
    walletAccount.customer = this.customer;

    this.walletAccountService.addWalletAccount(walletAccount).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.utilService.openSnackBar(response.responseMessage)
        }else{
          this.utilService.openSnackBar('Register account success', true)
        }
      }
    )
  }
}
