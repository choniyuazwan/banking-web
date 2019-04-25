import { Component, OnInit, ViewChild } from '@angular/core';
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
  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionService: TransactionService, public dialog: MatDialog) {  }

  transactions: Transaction[];

  ngOnInit() {
    this.transactionService.getTransactions(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.transactions = response.data;
        }
        this.transactions.forEach((element: Transaction) => {
          if( element.accountCredit ) {
            console.log(element.accountCredit.accountNumber)
          }
        });
        this.dataSource = new MatTableDataSource(this.transactions);
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
