import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountAddComponent } from 'src/app/account/account-add/account-add.component';
import { TransactionTopupComponent } from '../transaction-topup/transaction-topup.component';
import { TransactionTransferComponent } from '../transaction-transfer/transaction-transfer.component';
import { TransactionWithdrawComponent } from '../transaction-withdraw/transaction-withdraw.component';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TransactionService } from 'src/app/shared/service/transaction.service';
import { Transaction } from 'src/app/shared/model/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'accountDebit', 'accountCredit', 'amount', 'date'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionService: TransactionService, public dialog: MatDialog) {  }

  transactions: Transaction;

  ngOnInit() {
    this.transactionService.getTransactions(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          // alert(JSON.stringify(response.data))
          console.log(JSON.stringify(response.data[0]))
          this.transactions = response.data;
        }

        let arrayTransactions = Object.keys(this.transactions).map(i => this.transactions[i])
        this.dataSource = new MatTableDataSource(arrayTransactions);

        console.log("ini array\n\n")
        console.log(JSON.stringify(arrayTransactions[0]))

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
