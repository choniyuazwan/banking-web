import { Component, OnInit } from '@angular/core';
import { AccountAddComponent } from 'src/app/account/account-add/account-add.component';
import { TransactionTopupComponent } from '../transaction-topup/transaction-topup.component';
import { TransactionTransferComponent } from '../transaction-transfer/transaction-transfer.component';
import { TransactionWithdrawComponent } from '../transaction-withdraw/transaction-withdraw.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  dialog: any;

  constructor() { }

  ngOnInit() {
  }

  topup() {
    const dialogRef = this.dialog.open(TransactionTopupComponent,{
      width: '640px', disableClose: true ,
    });
  }

  transfer() {
    const dialogRef = this.dialog.open(TransactionTransferComponent,{
      width: '640px', disableClose: true ,
    });
  }

  withdraw() {
    const dialogRef = this.dialog.open(TransactionWithdrawComponent,{
      width: '640px', disableClose: true ,
    });
  }

}
